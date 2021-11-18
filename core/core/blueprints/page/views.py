from flask import Blueprint, render_template, redirect, request, url_for, flash, send_file, current_app

from core.blueprints.page.forms import ContactForm

page = Blueprint('page', __name__, template_folder='templates')

@page.route('/')
@page.route('/home/')
def home_root():
    return redirect(url_for('page.landing', language=current_app.config['app_language']))

@page.route('/home/<string:language>', methods=['GET','POST'])
def landing(language):
    if(language not in current_app.config['languages']):
        language = current_app.config['app_language']

    contact_form = ContactForm()
    if contact_form.validate_on_submit():
        # This prevents circular imports.
        from core.blueprints.page.tasks import deliver_contact_email
        deliver_contact_email.delay(request.form.get('name'), request.form.get('email'), request.form.get('message'))
    else:
        flash('No Token has been deleted, contact the technical support.', 'error')
        
    return render_template('page/landing.html', **current_app.config['languages'][language], c_form=contact_form)

# utilities
@page.route("/robots.txt")
def robots_txt():
    path = "static/files/"+request.path
    return send_file(path, as_attachment=True)

@page.route("/favicon.ico")
def logo():
    path = "static/images/favicon.png"
    return send_file(path, as_attachment=True)