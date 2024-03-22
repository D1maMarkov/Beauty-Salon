from django.http import HttpResponse
import logging


logger = logging.getLogger("main")

def logging_decorator(func):
    def wrapper(request, *args, **kwargs):
        try:
            response = func(request, *args, **kwargs)
            return response
        except Exception as e:
            logger.error(e)
            return HttpResponse(status=200)

    return wrapper