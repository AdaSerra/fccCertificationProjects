#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo -e "\nEnter your username:"
read USERNAME

FIND_USER=$($PSQL "SELECT username FROM players WHERE username='$USERNAME';")
FIND_ID=$($PSQL "SELECT user_id FROM players WHERE username='$USERNAME';")

if [[ -z $FIND_USER ]]
then
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  ADD_USER=$($PSQL "INSERT INTO players(username) VALUES('$USERNAME');")
else
  GAMES_PLAYED=$($PSQL "SELECT COUNT(game_id) FROM games WHERE user_id=$FIND_ID;")
  BEST_GAME=$($PSQL "SELECT MIN(number_of_guesses) AS best_game FROM games WHERE user_id=$FIND_ID")
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

echo -e "\nGuess the secret number between 1 and 1000:"
read USER_GUESS

SECRET_NUMBER=$(( (RANDOM % 1000) + 1 ))

GUESS_COUNT=0

until [[ $USER_GUESS == $SECRET_NUMBER ]]
do
  if [[ ! $USER_GUESS =~ ^[0-9]+$ ]]
    then
    echo -e "That is not an integer, guess again:"
    read USER_GUESS
    ((GUESS_COUNT++))
    else
      if [[ $USER_GUESS < $SECRET_NUMBER ]]
      then
      echo "It's higher than that, guess again:"
      read USER_GUESS
      ((GUESS_COUNT++))
      else
      echo "It's lower than that, guess again:"
      read USER_GUESS
      ((GUESS_COUNT++))
      fi
  fi
done
((GUESS_COUNT++))
FIND_ID=$($PSQL "SELECT user_id FROM players WHERE username='$USERNAME';")
INSERT_GAME=$($PSQL "INSERT INTO games(user_id,number_of_guesses,secret_number) VALUES($FIND_ID,$GUESS_COUNT,$SECRET_NUMBER);")
echo -e "\nYou guessed it in $GUESS_COUNT tries. The secret number was $SECRET_NUMBER. Nice job!"
