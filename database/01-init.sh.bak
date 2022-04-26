#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
    CREATE TABLE IF NOT EXISTS "Todos" (
	    "Id" serial NOT NULL,
      "Name" text NOT NULL,
      "Day" text NOT NULL,
      "Reminder" boolean,
    CONSTRAINT "PK_Todos" PRIMARY KEY ("Id")
	);
  COMMIT;
EOSQL