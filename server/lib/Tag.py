class Tag:

    def __init__(self):
        self.allTagsSQL = "select distinct name from tags"
        self.addTagSQL  = "insert into tags(name) values ('%s')"
        self.getTagIDSQL = "select tag_id from tags where name = '%s'"

    def getAllTags(self, cursor):
        cursor.execute(self.allTagsSQL)
        tags = cursor.fetchall()
        tags = [tag[0] for tag in tags]
        return {"tags":tags}

    def addTag(self, tagname, cursor):
        cursor.execute(self.addTagSQL%tagname)
        return {"result":"success"}

    def getTagID(self, tagname, cursor):
        cursor.execute(self.getTagIDSQL%tagname)
        tagID = cursor.fetchone()[0]
        return tagID
        