class User:
    """User related """
    def __init__(self):
        self.loginsql = "select count(*) from user where username='%s' and password='%s'"
        self.checksql = "select count(*) from user where username=lcase('%s')"
        self.signupsql = "insert into user (username, password) values (lcase('%s'), '%s')"

    def login(self, username, password, cursor):
        ret = {}
        sql = self.loginsql%(username, password)
        cursor.execute(sql)
        if cursor.fetchone()[0] == 0:
            ret["result"] = "failure"
            ret["error"] = "Invalid username/password"
        else:
            ret["result"] = "success"
        return ret

    def signup(self, username, password, cursor):
        ret = {}
        checksql = self.checksql%(username)
        cursor.execute(checksql)
        if cursor.fetchone()[0] == 0:
            signupsql = self.signupsql%(username, password)
            cursor.execute(signupsql)
            ret["result"] = "success"
        else:
            ret["result"] = "failure"
            ret["error"] = "user already exists"
        return ret
