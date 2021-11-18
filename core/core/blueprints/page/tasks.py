from lib.flask_mailplus import send_template_message
from core.app import create_celery_app

celery = create_celery_app()


@celery.task()
def deliver_contact_email(name, email, subject, message):
    """
    Send a contact e-mail.

    :param email: E-mail address of the visitor
    :type user_id: str
    :param message: E-mail message
    :type user_id: str
    :return: None
    """
    ctx = {'name': name, 'email': email, 'message': message}

    send_template_message(subject='Richiesta di Contatto Pervenuta',
                          sender=celery.conf.get('MAIL_USERNAME'),
                          recipients=[email],
                          template='page/mail/reply', ctx=ctx)

    send_template_message(subject='[GBigini Website] '+subject,
                          sender=celery.conf.get('MAIL_USERNAME'),
                          recipients=['devbigdsc@gmail.com'],
                          template='page/mail/index', ctx=ctx)

    return None