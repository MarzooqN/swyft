# # app/services/nfc_service.py
    
# amount_dict = {
#     'tid1': 20,
#     'tid2': 10,
#     'tid3': 5
# }

# def send_data_to_dashboard(data):
#     pass

# #What needs to be implemented with consultant 
# def send_data_to_worldpay(data):
#     amount = amount_dict[data.tid]
#     pass


# while True:
#     #keep asking for money from nfc (this will keep the nfc reader open looking for a card) (will be implemmented through sdk)
#     data = 'data from card reader'


#     #If there is no card data then it will skip to next iteration of loop skipping everything
#     if not data.card_data: #card_data will either be None (meaning no card was tapped) or the card_data value
#         continue
    
#     #This will send the data to our dashboard 
#     send_data_to_dashboard(data)

#     #This will send the data to worldpay
#     send_data_to_worldpay(data)

class NFCService:
    def read_data(self):
        # Mock data for now
        return {
            'donor_name': 'John Doe',
            'amount': 20.0,
            'timestamp': '2023-10-01T12:00:00Z',
            'nfc_reader_id': 1
        }
