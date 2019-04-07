CREATE KEYSPACE IF NOT EXISTS coursemeleon WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE coursemeleon;
CREATE TABLE IF NOT EXISTS users( 
  user_id UUID, 
  user_email text PRIMARY KEY, 
  user_name text
) WITH comment='User identification';
CREATE INDEX IF NOT EXISTS uid_index ON users(user_id);
CREATE TABLE IF NOT EXISTS courses(
  course_id UUID,
  path TEXT,
  title TEXT,
  term TEXT,
  term_start TIMESTAMP,
  PRIMARY KEY (title, term_start) 
) WITH CLUSTERING ORDER BY (term_start DESC);
CREATE INDEX IF NOT EXISTS cid_index ON courses(course_id);
CREATE TABLE IF NOT EXISTS permissions(
  user_id UUID,
  course_id UUID,
  level TINYINT,
  saved BOOLEAN,
  PRIMARY KEY ((user_id, course_id))
) WITH comment='Access table: UID + CID = ACCESS LEVEL';