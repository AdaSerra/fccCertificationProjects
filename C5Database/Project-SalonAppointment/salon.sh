#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=salon -t -c"

MAIN_MENU() {
  if [ $# -eq 0 ]
  then
echo -e "\n~~~~~ MY SALON ~~~~~"
echo -e "\nWelcome to My Salon, how can I help you?\n"
 else 
 echo -e "\n$@"
 fi
$PSQL "SELECT * FROM services"| while read SERVICE_ID BAR SERVICE_NAME
do
echo "$SERVICE_ID) $SERVICE_NAME"
done
read SERVICE_ID_SELECTED
if [[ ! $SERVICE_ID_SELECTED =~ ^[1-9]$  ]]
then 
MAIN_MENU "I could not find that service. What would you like today?" 
else
echo -e "\nWhat's your phone number?"
read CUSTOMER_PHONE
CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")
if [[ -z $CUSTOMER_ID ]]
then
echo -e "\nI don't have a record for that phone number. What's your name?"
read CUSTOMER_NAME
$PSQL "INSERT INTO customers(phone,name) VALUES('$CUSTOMER_PHONE','$CUSTOMER_NAME')"
CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")

MAKEAPP $CUSTOMER_ID $SERVICE_ID_SELECTED
else
MAKEAPP $CUSTOMER_ID $SERVICE_ID_SELECTED
fi
fi
}

MAKEAPP() {
  
CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE customer_id = $1")
SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $2")
echo -e "\nWhat time you like your$SERVICE_NAME,$CUSTOMER_NAME?"
read SERVICE_TIME
$PSQL "INSERT INTO appointments(customer_id,service_id,time) VALUES($1,$2,'$SERVICE_TIME')"
echo -e "\nI have put you down for a$SERVICE_NAME at $SERVICE_TIME,$CUSTOMER_NAME."
exit 0
}


MAIN_MENU