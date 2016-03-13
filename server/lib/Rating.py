class Rating:

    def __init__(self):
        self.fetchRatingID = "select rating_id from rating_audit where username='%s' and shop_id= %s"
        self.updateRating = "update rating_audit set thumbsup = %s, thumbsdw=%s where rating_id = %s"
        self.insertRating = "insert into rating_audit (username, thumbsup, thumbsdw, shop_id) values ('%s', %s, %s, %s)"
        self.updateShopRating = """ update shop_ratings sr
join (select shop_id, sum(thumbsup) as up, sum(thumbsdw) as down from rating_audit group by shop_id) net on sr.shop_id = net.shop_id
set thumbsup = net.up , thumbsdw = net.down
        where net.shop_id = %s
        """
        self.addRating = "insert into shop_ratings(shop_id, thumbsup, thumbsdw) values (%s,%s,%s)"
        self.checkRating = "select count(*) from shop_ratings where shop_id = %s"

    def updateVotes(self, votes, cursor):
        thumbsup,thumbsdw = 0, 0
        print votes.upvote
        if votes.upvote == False:
            thumbsdw += 1
        else:
            thumbsup += 1
        cursor.execute(self.fetchRatingID%(votes.username, votes.shop_id))
        rating_ids = cursor.fetchall()
        if rating_ids == ():
            self.insertUserRating(votes.username, votes.shop_id, thumbsup, thumbsdw,cursor)
        else:
            rating_id = rating_ids[0][0]
            cursor.execute(self.updateRating%(thumbsup, thumbsdw, rating_id))
            cursor.execute(self.updateShopRating%votes.shop_id)

    def insertUserRating(self, username, shop_id, thumbsup, thumbsdw, cursor):
        
        cursor.execute(self.insertRating%(username, thumbsup, thumbsdw, shop_id))
        cursor.execute(self.checkRating%shop_id)
        count = cursor.fetchone()[0]
        print count
        if count == 0:
            print self.addRating%(shop_id,thumbsup, thumbsdw)
            cursor.execute(self.addRating%(shop_id,thumbsup, thumbsdw))
        cursor.execute(self.updateShopRating%shop_id)
        return {"result" : "success"}