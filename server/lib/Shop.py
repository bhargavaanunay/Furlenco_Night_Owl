class Shop:

    def __init__(self):
        self.addShopsql = "insert into shop(name, latitude, longitude) values ('%s',%0.14f,%0.14f)"
        self.getShopIDsql = "select max(shop_id) from shop where latitude=%0.14f and longitude=%0.14f"
        self.addShopTagsql = "insert into tag_shop_map (tag_id, shop_id) values(%s, %s)"
        self.findRatingsql = "select count(*) from shop_ratings where shop_id=%s"
        self.addRatingsql = "insert into shop_ratings(shop_id, thumbsup, thumbsdw) values (%s,%s,%s)"
        self.updateRatingsql = "update shop_ratings set thumbsup = thumbsup + %s, thumbsdw = thumbsdw + %s where shop_id = %s"
        self.fetchshopSQL = """select s.shop_id, s.name, t.name, s.latitude, s.longitude , sr.thumbsup, sr.thumbsdw from shop s join 
                    tag_shop_map tsm on tsm.shop_id = s.shop_id join tags t on t.tag_id = tsm.tag_id join
                    shop_ratings sr on sr.shop_id = s.shop_id"""     



    def __addShop__(self, name, latitude, longitude, cursor):
        print self.addShopsql%(name,latitude,longitude)
        cursor.execute(self.addShopsql%(name,latitude,longitude))

    def __addTag__(self, tag_id, latitude, longitude, cursor):
        cursor.execute(self.getShopIDsql%(latitude, longitude))
        shop_id = cursor.fetchone()
        if shop_id != ():
            shop_id = shop_id[0]
        print self.addShopTagsql%(tag_id, shop_id)
        cursor.execute(self.addShopTagsql%(tag_id, shop_id))
        return shop_id, tag_id

    # def __addReview__(self, review, username, shop_id, cursor):
    #     cursor.execute(self.addReviewsql, (shop_id, review, username))

    def __addRating__(self, upvote, shop_id, cursor):
        cursor.execute(self.findRatingsql, shop_id)
        thumbsup, thumbsdw = 0, 0
        if upvote == False:
            thumbsdw = 1
        else:
            thumbsup = 1
        if cursor.fetchone()[0] == 0:
            cursor.execute(self.addRatingsql, (shop_id, thumbsup, thumbsdw))
        else:
            cursor.execute(self.updateRatingsql,(thumbsup, thumbsdw, shop_id))
        return thumbsup, thumbsdw

    def addShop(self, shop, tag_id, cursor):
        self.__addShop__(shop.name, shop.location.latitude, shop.location.longitude, cursor)
        shop_id, tag_id = self.__addTag__(tag_id, shop.location.latitude, shop.location.longitude, cursor)
        # self.__addReview__(self, shop.review, shop.username, shop_id, cursor)
        # thumbsup, thumbsdw = self.__addRating__(shop.upvote, shop_id, cursor)
        # return shop_id, thumbsup, thumbsdw
        return {'result':'success'} , shop_id

    def getShop(self, cursor):
        cursor.execute(self.fetchshopSQL)
        ret = []
        for data in cursor.fetchall():
            temp = {}
            temp["name"] = data[1]
            temp["tag"] = data[2]
            temp["latitude"] = str(data[3])
            temp["longitude"] = str(data[4])
            temp["upvote"] = str(data[5])
            temp["downvote"] = str(data[6])
            temp["shop_id"] = data[0]
            ret.append(temp)
        return {"shops":ret}