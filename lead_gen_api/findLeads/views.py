import json
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from findLeads.serializers import GetLeadTablesSerializer, LeadSearchSerializer
from apify_client import ApifyClient
from .models import leadTable
import datetime
import os

'''
View should only by accessed by logged in users. 
^ TO IMPLEMENT
'''
class FindLeadsView(generics.CreateAPIView): #View should only be accessible to logged in user
    serializer_class = LeadSearchSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = LeadSearchSerializer(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        location = serializer.validated_data['location']
        industry = serializer.validated_data['industry']

        response_data = {
            'industry': serializer.validated_data['industry'],
            'location': serializer.validated_data['location'],
        
        }

        TOKEN = TOKEN = os.environ.get("APIFY_TOKEN")
        apify = ApifyClient(TOKEN)

        actor_client = apify.actor('compass/google-maps-extractor')
        input_data = {'locationQuery':location,
                    "maxCrawledPlacesPerSearch": 3,
                    "searchStringsArray": [industry]
                    }

        result = actor_client.call(run_input=input_data, timeout_secs=60)
        dataset_client = apify.dataset(result['defaultDatasetId'])
        list_items_result = dataset_client.list_items()
        items = list_items_result.items 

        businesses = []
        num = 1
        for entry in items:
            business = {
                "id":num,
                "name": entry.get("title", "").strip(),
                "industry": industry,
                "location": location,
                "phone": entry.get("phone", "").strip(),
            }
            num+= 1
            businesses.append(business)

        lead = leadTable(name=industry+", " +location , data=json.dumps(businesses), user=request.user)
        lead.save()
        
        return Response(json.dumps(businesses), status=status.HTTP_200_OK)
    
class LoadTablesView(generics.ListAPIView):
    serializer_class = GetLeadTablesSerializer
    # #permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     return leadTable.objects.all() #(
    #     #     user_id=self.request.uys,  # Using the authenticated user
    #     #     name="time"
    #     # ).order_by('created_at')
    def get(self, request):
        qs = leadTable.objects.filter(user_id=self.request.user, name='time')

        data = qs.values()
        return Response(data)
    
   