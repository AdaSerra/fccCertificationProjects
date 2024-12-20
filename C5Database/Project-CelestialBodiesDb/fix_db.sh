#! /bin/bash

RENAME1_WEIGHT="ALTER TABLE properties RENAME COLUMN weight TO atomic_mass;"

RENAME2_MELTING_POINT="ALTER TABLE properties RENAME COLUMN melting_point TO melting_point_celsius;"

RENAME3_BOILING_POINT="ALTER TABLE properties RENAME COLUMN boiling_point TO boiling_point_celsius;"

ALTER1_PROP_MELTING_POINT="ALTER TABLE properties ALTER COLUMN melting_point_celsius SET NOT NULL;"

ALTER2_PROP_BOILING_POINT="ALTER TABLE properties ALTER COLUMN boiling_point_celsius SET NOT NULL;"

ALTER3_ELEMENTS_SYMBOL_UNIQUE="ALTER TABLE elements ADD UNIQUE(symbol);"

ALTER4_ELEMENTS_NAME_UNIQUE="ALTER TABLE elements ADD UNIQUE(name);"

ALTER5_ELEMENTS_SYMBOL_NOT_NULL="ALTER TABLE elements ALTER COLUMN symbol SET NOT NULL;"

ALTER6_ELEMENTS_NAME_NOT_NULL="ALTER TABLE elements ALTER COLUMN name SET NOT NULL;"

ALTER7_PROP_ATOMIC_NUMBER_FORKEY="ALTER TABLE properties ADD FOREIGN KEY(atomic_number) REFERENCES elements(atomic_number);"

CREATE1_TBL_TYPES="CREATE TABLE types();"

ADD1_TYPES_TYPES_ID="ALTER TABLE types ADD COLUMN type_id SERIAL PRIMARY KEY;"

ADD2_TYPES_TYPES="ALTER TABLE types ADD COLUMN type VARCHAR(20) NOT NULL;"

INSERT1_COLUMN_TYPES_TYPE="INSERT INTO types(type) SELECT DISTINCT(type) FROM properties;"

ADD3_COLUMN_PROP_TYPE_ID="ALTER TABLE properties ADD COLUMN type_id INT NOT NULL;"

ADD4_FORKEY_PROP_TYPE_ID="ALTER TABLE properties ADD FOREIGN KEY(type_id) REFERENCES types(type_id);"

UPDATE1_ELEMENTS_SYMBOLS_CAPS="UPDATE elements SET symbol=INITCAP(symbol);"

ALTER7_VARCHAR_PROP_ATOMIC_MASS="ALTER TABLE PROPERTIES ALTER COLUMN atomic_mass TYPE VARCHAR(9);"

UPDATE2_FLOAT_PROP_ATOMIC_MASS="UPDATE properties SET atomic_mass=CAST(atomic_mass AS FLOAT);"

INSERT2_ELEMENT_F="INSERT INTO elements(atomic_number,symbol,name) VALUES(9,'F','Fluorine');"

INSERT3_PROP_F="INSERT INTO properties(atomic_number,type,melting_point_celsius,boiling_point_celsius,type_id,atomic_mass) VALUES(9,'nonmetal',-220,-188.1,3,'18.998');"

INSERT4_ELEMENT_NE="INSERT INTO elements(atomic_number,symbol,name) VALUES(10,'Ne','Neon');"

INSERT5_PROP_NE="INSERT INTO properties(atomic_number,type,melting_point_celsius,boiling_point_celsius,type_id,atomic_mass) VALUES(10,'nonmetal',-248.6,-246.1,3,'20.18');"

DELETE6_ELEM_1000="DELETE FROM elements WHERE atomic_number=1000;"

DELETE7_PROP_1000="DELETE FROM properties WHERE atomic_number=1000;"

DELETE8_COLUMN_PROP_TYPE="ALTER TABLE properties DROP COLUMN type;"

