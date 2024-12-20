#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

cat games.csv | while IFS=',' read -r col1 col2 col3 col4 col5 col6;

do
if [[ $col3 != 'winner' ]]
then
RESULT = $($PSQL "SELECT * FROM teams WHERE name = '$col3'")
if [[ -z "$RESULT" ]]
then
$PSQL "INSERT INTO teams(name) VALUES('$col3')"
fi
fi
if [[ $col4 != 'opponent' ]]
then
RESULT = $($PSQL "SELECT * FROM teams WHERE name = '$col4'")
if [[ -z "$RESULT" ]]
then
$PSQL "INSERT INTO teams(name) VALUES('$col4')"
fi
fi
if [[ $col1 != 'year' ]]
then
IDW=$($PSQL "SELECT team_id FROM teams WHERE name = '$col3'")
IDO=$($PSQL "SELECT team_id FROM teams WHERE name = '$col4'")
$PSQL "INSERT INTO games(year,round,winner_id,opponent_id,winner_goals,opponent_goals) VALUES($col1,'$col2',$IDW,$IDO,$col5,$col6)"
fi
done