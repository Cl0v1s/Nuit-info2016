/*login.php*/
select username
from User
where username="toto" and pwd="otot"

/*register.php*/
insert into User(username,pwd,mail)
values("user","pwd","")

/*getCard.php*/
select *
from Card
where id="42"

/*getCards*/
select *
from Card
where id>=startId and id<startId+length

/*getUser*/
select username,mail,priority
from User
where id="42"

/*addCard.php*/
insert into Card(title,description,value,priority,date)
values("monTitre","celien",0,0,getDate());

/*voteCard*/
update Card
set value=newvalue ( + ou - 1)
where id="42"

/*getSticker*/
select *
from Sticker
where id="42"

