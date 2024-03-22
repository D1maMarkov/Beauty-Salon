from utils.user_errors import errors as user_errors
from utils.validators import is_valid_phone
from .models import Notation
from django import forms


class NotationForm(forms.ModelForm):
    service_id = forms.IntegerField()
    
    class Meta:
        model = Notation
        fields = ['name', 'secondname', 'phone', 'time', 'month', 'date', 'service_id']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].error_messages = {'required': user_errors["empty_name"]}
        self.fields['secondname'].error_messages = {'required': user_errors["empty_secondname"]}
        self.fields['phone'].error_messages = {'required': user_errors["incorrect_phone"]}

    def clean_phone(self):
        phone = self.cleaned_data['phone']

        if not is_valid_phone(phone):
            self.add_error("phone", user_errors["incorrect_phone"])

        return phone