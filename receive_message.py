from azure.servicebus import ServiceBusClient, ServiceBusMessage

CONNECTION_STR = "Endpoint=sb://arinjayservicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=s7N+jAlA4KoWO7YTDqdTCdzXdkdbTXhyV+ASbEtcppk="
TOPIC_NAME = "servicebusdemotopic1"
SUBSCRIPTION_NAME = "servicebusdemosubscription1"


servicebus_client = ServiceBusClient.from_connection_string(conn_str=CONNECTION_STR, logging_enable=True )    

def receive_message():
    with servicebus_client:
        with servicebus_client.get_subscription_receiver(topic_name=TOPIC_NAME, subscription_name=SUBSCRIPTION_NAME, max_wait_time=5) as receiver:
            for message in receiver:
                message_content = b"".join(message.body).decode() 
                print(f"Received : {message_content}")
                receiver.complete_message(message)



print("Receiving message from queue...")
receive_message()



