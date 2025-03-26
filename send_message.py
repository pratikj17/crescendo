from azure.servicebus import ServiceBusClient, ServiceBusMessage

CONNECTION_STR = "Endpoint=sb://arinjayservicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=s7N+jAlA4KoWO7YTDqdTCdzXdkdbTXhyV+ASbEtcppk="
TOPIC_NAME = "servicebusdemotopic1"
SUBSCRIPTION_NAME = "servicebusdemosubscription1"



def send_single_message(sender):
    message = ServiceBusMessage("Hello")
    sender.send_messages(message)
    print("Sent Hello")

def send_list_message(sender):
    """Send a batch of messages to the Service Bus Topic"""
    lis_message = sender.create_message_batch()
    for _ in range(5):
        try:
            lis_message.add_message(ServiceBusMessage("Hello World"))  # ✅ Corrected
        except ValueError:
            break  # Stop if batch is full
    sender.send_messages(lis_message)  # ✅ Send the batch properly
    print("Sent a batch of 5 messages")      


servicebus_client = ServiceBusClient.from_connection_string(conn_str=CONNECTION_STR, logging_enable=True )    


with servicebus_client:
      sender = servicebus_client.get_topic_sender(topic_name=TOPIC_NAME)
      with sender:
            send_single_message(sender)
            send_list_message(sender)

print("Done sending message")            