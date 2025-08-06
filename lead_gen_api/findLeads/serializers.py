from rest_framework import serializers

from findLeads.models import leadTable

class LeadSearchSerializer(serializers.Serializer):
    industry = serializers.CharField(
        required = False,
    )

    location = serializers.CharField(
        required = True,
        style={'input_type':'location'}
    )

    size = serializers.CharField(
        required = False,
    )

    def validate(self, attrs):
        industry = attrs.get('industry')
        location = attrs.get('location')

        if industry and location == None or location==None:
            msg = "Please enter valid search options"
            raise(serializers.ValidationError(msg, code='input_params'))
        
        return attrs
        
class GetLeadTablesSerializer(serializers.Serializer):
  model = leadTable 
  fields = '__all__'