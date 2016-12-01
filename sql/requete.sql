/*login.php*/
select *
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
select id, count(*) as total
from Card

/*getUser*/
select *
from User
where id="42"

/*addCard.php*/
insert into Card(title,description,value,priority,date)
values("monTitre","celien",0,0,getDate());
