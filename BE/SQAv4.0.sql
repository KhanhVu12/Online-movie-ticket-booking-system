drop database if exists sqaproject;
create database sqaProject;
use sqaProject;
create table role(roleId int auto_increment primary key, roleName varchar(10) not null);
create table user(userId int auto_increment primary key, userName varchar(50) not null, userPassword varchar(15) not null, roleId int not null , userAge int not null, userEmail varchar(30) not null, userAddress varchar(50) not null, phoneNumber varchar(11) not null, foreign key(roleId) references role(roleId));
create table seatType(seatTypeId int auto_increment primary key, seatTypeName varchar(15) not null, seatTypeAmount int not null, price int not null);
create table bookedSeat(seatId int auto_increment primary key, seatName varchar(3), seatTypeId int not null, showTimeId int not null, foreign key(seatTypeId) references seatType(seatTypeId));
create table movie(movieId int auto_increment primary key, title varchar(100) not null, genre varchar(100), image text not null, trailerLink text not null, description text not null, length int not null, origin varchar(30), releasedDate date not null, director varchar(60), actors text);
create table showTime(showTimeId int auto_increment primary key, movieId int, startTime datetime not null, roomId int not null, foreign key(movieId) references movie(movieId));
create table ticket(userId int, seatId int, showTimeId int, foreign key(userId) references user(userId), foreign key(seatID)references bookedSeat(seatId), foreign key(showTimeId) references showTime(showTimeId));
create table food(foodId int auto_increment primary key, foodName varchar(30) not null, foodPrice int not null);
create table foodOrder(foodId int, userId int,amount int, foreign key(foodId)references food(foodId), foreign key(userId)references user(userId));
create table orderBill(userId int, orderDate DateTime, totalPrice int not null, paymentType varchar(20));

-- insert data

insert into role(roleName) values("admin"), ("normalUser");
insert into user(userName, userPassword, roleId, userAge, userEmail, userAddress, phoneNumber) values
	("admin", "123", 1, 23, "admin@gmail.com", "Hanoi", "0987654321"), 
	("quandd", "1234", 2, 31, "quandd@gmail.com", "Hanoi", "0917477321"), 
	("anonymous", "hacker", 2, 33, "hackeverything@gmail.com", "russia", "0123456789"), 
	('noname', 'nopass', '1', '24', 'nothing@gmail.com', 'Hungyen', '0985647123');
insert into seattype(seatTypeName, seatTypeAmount, price) values ('normal', '80', '100000'), ('vip', '20', '120000');
insert into food (foodName, foodPrice) values ('popcorn', 50000), ('coca', 30000), ('pepsi', 30000),('snack', 10000);
insert into sqaproject.movie (title, genre, image, trailerLink, description, length, origin, releasedDate, director, actors) values 
	('TURNING RED: GẤU ĐỎ BIẾN HÌNH - P', 'Hoạt hình', 'https://chieuphimquocgia.com.vn/Content/Images/0016408_0.jpeg', 'https://www.youtube.com/watch?v=XdKzUbAiswE&t=17s', '\"Turning Red - Gấu Đỏ Biến Hình\" từ Disney và Pixar kể về Mei Lee, cô bé 13 tuổi tự tin và ngổ ngáo với những sự hỗn loạn của tuổi mới lớn. Mẹ của Mei luôn cố gắng bảo bọc và ở bên cạnh con gái mọi lúc mọi nơi, khiến cô bé cảm thấy như một thảm hoạ vậy. Và cứ như thể những thay đổi về sở thích, các mối quan hệ và thể chất còn chưa đủ, mỗi khi Mei trở nên quá phấn khích (mà thật ra lúc nào cũng vậy), \"bùm\", cô bé sẽ biến hình thành một chú gấu đỏ siêu cute khổng lồ luôn!', '90', 'Mỹ', '2022/03/11', 'Domee Shi', 'Rosalie Chiang, Sandra Oh, James Hong'), 
    ('GÃ ĐIÊN BÁO THÙ - C18', 'Hành động', 'https://chieuphimquocgia.com.vn/Content/Images/0016424_0.jpeg', 'https://www.youtube.com/watch?v=j1g-sOkD9jU', 'Gã Điên Báo Thù xoay quanh H – tên thật là Patrick Hill (Jason Statham đóng), một nhân viên vừa được Fortico Securities thuê vào đội bảo an sau khi chiếc xe bọc thép chở đầy tiền của hãng hứng chịu một cuộc phục kích chết người. H là một kẻ trầm lặng, dường như gã coi công việc này chỉ là cần câu cơm kiếm sống qua ngày. Cho đến một ngày, chiếc xe tải mà H đang bảo vệ trở thành mục tiêu của một vụ cướp có chủ đích, những kỹ năng đáng gờm của gã được bộc lộ. Không chỉ là một tay thiện xạ, H còn là một kẻ không biết sợ, tàn nhẫn và máu lạnh. Sự thật nào ẩn giấu sau vẻ lãnh đạm của gã đàn ông cô độc song vô cùng nguy hiểm này?', '115', 'Mỹ', '2022-02-11', 'Guy Ritchie', 'Jason Statham, Holt McCallany, Jeffrey Donovan, Josh Hartnett, Scott Eastwood, Eddie Marsan'), 
    ('BATMAN - C16', 'Hành động, Hành động, Khoa học viễn tưởng, phiêu lưu', 'https://chieuphimquocgia.com.vn/Content/Images/0016404_0.jpeg', 'https://www.youtube.com/watch?v=mqqft2x_Aa4', 'Bộ phim đưa khán giả dõi theo hành trình phá án và diệt trừ tội phạm của chàng Hiệp sĩ Bóng đêm Batman, với một câu chuyện hoàn toàn khác biệt với những phần phim đã ra mắt trước đây. Thế giới ngầm ở thành phố Gotham xuất hiện một tên tội phạm kỳ lạ tên Riddler chuyên nhắm vào nhân vật tai to mặt lớn. Và sau mỗi lần phạm tội, hắn đều để lại một câu đố bí ẩn cho Batman. Khi bắt tay vào phá giải các câu đố này, Batman dần lật mở những bí ẩn động trời giữa gia đình anh và tên trùm tội phạm Carmine Falcon', '170', 'Mỹ', '2022/03/04', 'Matt Reeves', 'Robert Pattinson, Zoë Kravitz, Paul Dano'), 
    ('NGƯỜI NHỆN KHÔNG CÒN NHÀ - C13', 'Hành động, Phiêu lưu', 'https://chieuphimquocgia.com.vn/Content/Images/0016369_0.jpeg', 'https://www.youtube.com/watch?v=JfVOs4VSpmA', 'Lần đầu tiên trong lịch sử điện ảnh của Người Nhện, thân phận người hàng xóm thân thiện bị lật mở, khiến trách nhiệm làm một Siêu Anh Hùng xung đột với cuộc sống bình thường và đặt người anh quan tâm nhất vào tình thế nguy hiểm. Khi anh nhờ đến giúp đỡ của Doctor Strange để khôi phục lại bí mật, phép thuật đã gây ra lỗ hổng thời không, giải phóng những ác nhân mạnh mẽ nhất từng đối đầu với Người Nhện từ mọi vũ trụ. Bây giờ, Peter sẽ phải vượt qua thử thách lớn nhất của mình, nó sẽ thay đổi không chỉ tương lai của chính anh mà còn là tương lai của cả Đa Vũ Trụ.', '135', 'Mỹ', '2021/12/17', 'Jon Watts', 'Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, Jon Favreau'), 
    ('FAST & FURIOUS 9: HUYỀN THOẠI TỐC ĐỘ - C16', 'Hành động, Phiêu lưu', 'https://chieuphimquocgia.com.vn/Content/Images/0016368_0.jpeg', 'https://www.youtube.com/watch?v=FUK2kdPsBws', 'Hành động-mạo hiểm-kịch tính', '133', 'Mỹ', '2022-01-28', 'Justin Lin', 'Charlize Theron, Jim Parrack, John Cena'),
	('Bẫy ngọt ngào (2D) - C18', 'Tâm lý, tình cảm', 'https://chieuphimquocgia.com.vn/Content/Images/0015040_0.jpeg', 'BẪY NGỌT NGÀO - MAIN TRAILER | 11.02.2022 - YouTube', 'Sau một thời gian dài không gặp, cuộc sống của mỗi thành viên trong hội ế đều có nhiều thay đổi. Camy là người duy nhất “thoát ế” với cuộc sống đáng mơ ước bên người chồng tài hoa Đăng Minh. Quỳnh Lam đã là một nhà thiết kế nổi tiếng, Linh Đan là một luật sư thành đạt, còn Ken trở thành ông chủ phòng gym. Cả nhóm quyết định hội ngộ nhân dịp kỷ niệm 3 năm ngày cưới của Camy. Từ đây, những góc khuất trong cuộc sống riêng của từng người dần được hé lộ. Hội ế sẽ làm gì khi phát hiện ra những bí mật của mỗi thành viên lại là nguyên nhân khiến tình bạn của họ đối mặt với sóng gió.', '90', 'Việt Nam', '2021-12-07', 'Đinh Hà Uyên Thư', 'Bảo Anh, Minh Hằng, Diệu Nhi, Thuận Nguyễn, Quốc Trường');
insert into foodOrder (foodId, userId, amount) VALUES (1, 2, 2), (2, 2, 3);
insert into bookedSeat(seatName, seatTypeId, showTimeId) values
																 ('A1', 1, 2),('A2', 1, 1),('A3', 1, 1),('A4', 1, 1),('A6', 1, 2),('A7', 1, 1),('A8', 1, 1),('A9', 1, 1),('A10', 1, 1),('B1', 1, 1),('B2', 1, 1),('B3', 1, 1),('B4', 1, 1),('B5', 1, 1),('B6', 1, 1),('B7', 1, 1),('B8', 1, 1),('B9', 1, 1),('B10', 1, 1),
																 ('C1', 1, 1),('C2', 1, 1),('C4', 1, 1),('C5', 1, 2),('C6', 1, 2),('C7', 1, 1),('C8', 1, 1),('C9', 1, 1),('C10', 1, 1),('D1', 1, 1),('D2', 1, 1),('D3', 1, 1),('D4', 1, 1),('D5', 1, 1),('D6', 1, 1),('D7', 1, 1),('D8', 1, 1),('D9', 1, 1),('D10', 1, 1),
																 ('E1', 1, 1),('E2', 1, 1),('E3', 1, 1),('E4', 1, 2),('E5', 1, 2),('E6', 1, 2),('E7', 1, 2),('E8', 1, 1),('E9', 1, 1),('E10', 1, 1),('F1', 1, 1),('F2', 1, 1),('F3', 1, 2),('F4', 1, 2),('F5', 1, 2),('F6', 1, 2),('F7', 1, 2),('F8', 1, 2),('F9', 1, 1),
																 ('G1', 1, 1),('G2', 1, 1),('G3', 1, 2),('G5', 1, 2),('G6', 1, 2),('G7', 1, 2),('G8', 1, 2),('G9', 1, 1),('G10', 1, 1),('H1', 1, 1),('H2', 1, 1),('H3', 1, 1),('H4', 1, 2),('H5', 1, 2),('H6', 1, 2),('H7', 1, 2),('H8', 1, 1),('H9', 1, 1),('H10', 1, 1),
																 ('I1', 1, 1),('I2', 1, 1),('I3', 1, 1),('I4', 1, 1),('I6', 1, 1),('I7', 1, 1),('I8', 1, 1),('I9', 1, 1),('I10', 1, 1),('J1', 1, 1),('J2', 1, 1),('J3', 1, 1),('J4', 1, 1),('J5', 1, 1),('J6', 1, 1),('J7', 1, 2),('J8', 1, 2),('J9', 1, 1),('J10', 1, 1);
insert into showtime (movieId, startTime, roomId) values 
('1', '2022-04-01 09:00:00', '1'),
('2', '2022-04-01 11:30:00', '1'),
('3', '2022-04-01 14:00:00', '1'),
('4', '2022-04-01 16:30:00', '1'),
('2', '2022-04-01 09:00:00', '2'),
('5', '2022-04-01 11:30:00', '2'),
('4', '2022-04-01 14:00:00', '2'),
('1', '2022-04-01 16:30:00', '2');

commit;
 