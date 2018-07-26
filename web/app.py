import os
from flask import Flask, render_template, redirect, flash, url_for, request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired
# from flask_bootstrap import Bootstrap
from werkzeug.utils import secure_filename
import subprocess
from forms import LoginForm, InputForm
from config import Config
import logging

app = Flask(__name__)
app.config.from_object(Config)
# bootstrap = Bootstrap(app)

logging.basicConfig(filename='phame.log', level=logging.DEBUG)
logging.debug(app.config['PROJECT_DIRECTORY'])

def upload_files(request, form):
    success = False
    project_dir = os.path.join(app.config['PROJECT_DIRECTORY'], form.project.data)
    ref_dir = os.path.join(project_dir, 'refdir')
    work_dir = os.path.join(project_dir, 'workdir')
    logging.debug(project_dir)
    if os.path.exists(project_dir):
        return success
    os.makedirs(project_dir)
    if 'reference_file' in request.files:
        os.makedirs(ref_dir)
        reference_file = request.files['reference_file']
        filename = secure_filename(reference_file.filename)
        reference_file.save(os.path.join(ref_dir, filename))
        success = True

    if 'ref_dir' in request.files:
        if not os.path.exists(ref_dir):
            os.makedirs(ref_dir)
        for file_name in request.files.getlist("ref_dir"):
            filename = secure_filename(file_name.filename)
            file_name.save(os.path.join(ref_dir, filename))
        success = True
    if 'work_dir' in request.files:
        os.makedirs(work_dir)
        for file_name in request.files.getlist("work_dir"):
            filename = secure_filename(file_name.filename)
            filename = filename.split('.')[:1] + '.contig'
            file_name.save(os.path.join(work_dir, filename))
        success = True

    if 'reads_file' in request.files:
        reads_file = request.files['reads_file']
        filename = secure_filename(reads_file)
        reads_file.save(os.path.join(ref_dir, filename))
        success = True
    return success


@app.route('/run/<project>')
def run_phame(project):
    try:
        p1 = subprocess.Popen('./docker_run_phame.sh {0}'.format(project), shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = p1.communicate()
        logging.debug(stdout)
        logging.error(stderr)

    except subprocess.CalledProcessError as e:
        logging.error(str(e))
        return "An error occurred while trying to run PhaME: {0}".format(str(e))

    return redirect(url_for('display', project = project))

@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Mark'}
    return render_template('index.html', title='Home', user=user)


@app.route('/display/<project>', methods=['POST', 'GET'])
def display(project):
    tree_file = '{0}_all.fasttree'.format(project)
    source = os.path.join(app.config['PROJECT_DIRECTORY'], project, 'workdir', 'results', tree_file)
    target = os.path.join(os.path.dirname(__file__), 'static', tree_file)
    if not os.path.exists(target):
        os.symlink(source, target)
    return render_template('tree_output.html', tree= tree_file)


@app.route('/input', methods=['GET', 'POST'])
def input():

    form = InputForm()
    if request.method == 'POST':
        if not upload_files(request, form):
            flash('Project directory already exists')
            return render_template('input.html', title='Phame input', form=form)

    if form.validate_on_submit():
        if ('1' in form.data_type.data or '2' in form.data_type.data) and 'reference_file' not in request.files:
            flash('You must upload a reference genome if select Contigs or Reads from Data')
            return render_template('input.html', title='Phame input', form=form)
        form_dict = request.form.to_dict()
        project = form_dict['project']
        form_dict.pop('csrf_token')
        form_dict['ref_dir'] = '../{0}/refdir/'.format(project)
        form_dict['work_dir'] = '../{0}/workdir'.format(project)
        if 'reference_file' in request.files:
            form_dict['reference_file'] = form.reference_file.data.filename
        content = render_template('phame.tmpl', form=form_dict)
        with open(os.path.join(app.config['PROJECT_DIRECTORY'], project, 'config.ctl'), 'w') as conf:
            conf.write(content)
        return redirect(url_for('run_phame', project=project))
    return render_template('input.html', title='Phame input', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}', 'remember_me={}'.format(
            form.username.data, form.remember_me.data
        ))
        return redirect(url_for('login'))
    return render_template('login.html', title='Sign In', form=form)


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
