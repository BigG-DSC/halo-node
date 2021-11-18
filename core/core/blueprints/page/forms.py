from flask_wtf import FlaskForm
from wtforms import StringField, validators
from wtforms_components import EmailField
from wtforms.validators import DataRequired, Length

class ContactForm(FlaskForm):
    name = StringField("", [validators.Length(min=4)])
    email = EmailField("", [DataRequired(), Length(3, 254)])
    subject = StringField("", [validators.Length(min=4)])
    message = StringField("", [validators.Length(min=4)])