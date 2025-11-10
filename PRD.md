PRD: Cổng thông tin Khách hàng (Portal)
1.	Giới thiệu / Tổng quan
Cổng thông tin Khách hàng (Customer Portal) là một giao diện web riêng biệt, an toàn, cho phép khách hàng (ví dụ: các bệnh viện) tương tác trực tiếp với hệ thống MedEquip RepairFlow. Nó cung cấp sự minh bạch, cho phép khách hàng tự phục vụ (self-service) bằng cách gửi yêu cầu mới, theo dõi trạng thái các ticket đang mở, và xem lại lịch sử thiết bị của họ.
2.	Mục tiêu
•	Nghiệp vụ: Tăng cường sự hài lòng và giữ chân khách hàng bằng cách cung cấp sự minh bạch và một kênh liên lạc trực tiếp. Giảm tải công việc hành chính cho điều phối viên (dispatchers) bằng cách cho phép khách hàng tự gửi yêu cầu.
•	Người dùng (Khách hàng): Cung cấp một nơi duy nhất để quản lý tất cả các tương tác
dịch vụ, từ việc tạo ticket đến xem lịch sử thiết bị và hợp đồng.
•	Kỹ thuật:	Xây dựng	một	ứng dụng frontend (hoặc	một	phần	của	ứng dụng) được	bảo
mật nghiêm ngặt, nơi tất cả dữ liệu được lọc (scoped) theo customerId của người dùng đã đăng nhập.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Kỹ sư Y sinh (Khách hàng), tôi muố'n đăng nhập vào cổng thông tin và thấy ngay các số liệu thống kê (ví dụ: "3 ticket đang hoạt động", "1 thiết bị cần bảo trì").
•	Là một Kỹ sư Y sinh (Khách hàng), tôi muố'n nhấp vào nút "Request Service" (Yêu cầu Dịch vụ) để mở một biểu mẫu (form) đơn giản và gửi một ticket sửa chữa mới cho một trong các thiết bị của tôi.
•	Là một Ký sư Y sinh (Khách hàng), tôi muố'n xem tab "My Requests" để thấy danh sách tất cả các ticket tôi đã gửi (cả đang hoạt động và đã hoàn thành) và xem trạng thái hiện tại của chúng (ví dụ: "Technician On-Site", "Scheduled", "Completed").
•	Là một Trưởng phòng (Khách hàng), tôi muố'n xem tab "My Equipment" để thấy danh sách tất cả các thiết bị của bệnh viện tôi đang được quản lý bởi nhà cung cấp dịch vụ, cùng với trạng thái sức khỏe (health status) và lịch sử bảo trì của chúng.
•	Là một Trưởng phòng (Khách hàng), tôi muố'n xem tab "Service Contracts" để kiểm tra các điều khoản trong hợp đồng dịch vụ của chúng tôi (ví dụ: ngày hết hạn, các thiết bị được bảo hiểm).
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Xác thực (Authentication):
o Hệ thống phải cung cấp một trang đăng nhập riêng cho người dùng Cổng thông tin (Portal Users) (FR-P1).
o Mỗi người dùng Portal phải được liên kết với một customerld (Customer ID) (FR-P2).
2.	Bảo mật (Data Scoping):
o Quan trọng: Tất cả các API backend (/portal/...) phải được bảo vệ bởi một Lớp bảo vệ (Guard) xác thực (ví dụ: CustomerJwtGuard) (FR-P3).
o Tất cả các truy vấn dữ liệu (query) từ các API này (ví dụ: lấy ticket, lấy thiết bị) phải tự động và bắt buộc lọc theo customerId được trích xuất từ token JWT của người dùng đã đăng nhập (FR-P4).
3.	Tạo Yêu cầu (Request Creation):
o Nút "Request Service" phải mở NewTicketModal (FR-P5).
o Modal này (khi mở từ Portal) không được hiển thị trường chọn "Hospital/Facility" (Bệnh viện/Cơ sở) (vì nó đã được biết từ thông tin đăng nhập) (FR-P6).
o Modal này phải tự động lọc danh sách "Equipment" (Thiết bị) để chỉ hiển thị các thiết bị thuộc về customerId đã đăng nhập (FR-P7).
o Backend (ví dụ: POST /portal/tickets) phải tự động gán customerId cho ticket mới (FR-P8).
4.	Tab "My Requests" (Yêu cầu của tôi):
o Hệ thống phải hiển thị các thẻ KPI (Active, In Progress, Scheduled) được tính toán chỉ cho customerId đó (FR-P9).
o	Hệ thống phải hiển thị danh sách các portal-ticket-card (thẻ ticket) (FR-P10).
o	Nhấp vào một thẻ ticket phải hiển thị chế độ xem chi tiết (read-only) về trạng thái và
cập nhật của ticket đó (FR-P11).
5.	Tab "My Equipment" (Thiết bị của tôi):
o Hệ thống phải hiển thị một lưới (grid) các portal-equipment-card (thẻ thiết bị) thuộc sở hữu của customerId đó (FR-P12).
o Mỗi thẻ phải hiển thị thông tin như trong wireframe (Tên, S/N, Vị trí, Lần dịch vụ cuối, PM tiếp theo) (FR-P13).
6.	Tab "Service Contracts" (Hợp đồng Dịch vụ):
o Hệ thống phải hiển thị chi tiết (các) hợp đồng đang hoạt động liên quan đến customerId đó (FR-P14).
o Thông tin phải bao gồm thời hạn hợp đồng, các thiết bị được bảo hiểm, và các dịch vụ đi kèm (FR-P15).
5.	Non-Goals (Ngoài phạm vi)
•	Khách hàng không thể xem thông tin của các bệnh viện khác.
•	Khách hàng không thể xem chi tiết về Kỹ thuật viên (ngoại trừ tên) hoặc các mô-đun nội
bộ như Inventory (Kho), Reports (Báo cáo), hay Billing (Thanh toán).
•	Khách hàng không thể tự phê duyệt (approve) báo giá hoặc thanh toán hóa đơn qua
cổng thông tin trong phiên bản đầu tiên (trừ khi được yêu cầu sau).
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	Ứng dụng Frontend: Cân nhắc tạo một ứng dụng frontend riêng biệt (ví dụ:
packages/frontend-portal) thay vì tích hợp vào frontend-admin. Điều này giúp phân tách logic và bảo mật rõ ràng hơn.
•	Backend: Tạo một mô-đun backend PortalModule (portal.controller.ts, portal.service.ts).
•	Guards: Tạo một CustomerJwtGuard (hoặc tương tự) để bảo vệ các endpoint /portal/* và gắn customer (bao gồm customerId) vào đối tượng request.
•	Tái sử dụng Service: PortalService (backend) nên gọi các service hiện có (ví dụ: TicketsService, EquipmentService) nhưng luôn luôn truyền customerId từ Guard vào các hàm của service đó (ví dụ: this.ticketsService.findAll({ customerId: user.customerId })).
•	Tái sử dụng Component: NewTicketModal (frontend) có thể được tái sử dụng từ frontend-admin, nhưng được truyền một prop (ví dụ: mode="portal") để ẩn trường Khách hàng và lọc danh sách Thiết bị.
7.	Success Metrics (Chỉ số Thành công)
•	Giảm 40% số lượng cuộc gọi/email đến điều phối viên để hỏi "Ticket của tôi đang ở đâu?".
•	80% số lượng ticket mới (không khẩn cấp) được tạo qua Cổng thông tin thay vì qua điện
thoại/email.
•	Điểm hài lòng của khách hàng (CSAT) về tính minh bạch của dịch vụ đạt 4.5/5. 
PRD: Hệ thống MedEquip RepairFlow
1.	Giới thiệu / Tổng quan
MedEquip RepairFlow là một nền tảng quản lý dịch vụ toàn diện, được thiết kế để số hóa và tối ưu hóa toàn bộ quy trình sửa chữa và bảo trì thiết bị y tế.
Hệ thống này hợp nhất tất cả các bên liên quan vào một luồng công việc (workflow) duy nhất:
•	Khách hàng (Bệnh viện): Gửi yêu cầu dịch vụ và theo dõi tiến độ qua Cổng thông tin (Portal).
•	Quản lý (Admin): Giám sát hoạt động, phân công công việc, và xem báo cáo qua Bảng điều khiển (Dashboard).
•	Kỹ thuật viên (Tech): Nhận	công việc,	cập nhật trạng thái, ghi	lại	công	việc,	và	sử	dụng
phụ tùng qua Ứng dụng di động (Mobile App).
•	Kế' toán (Billing): Tự động tạo hóa đơn dựa trên công việc đã hoàn thành và theo dõi
thanh toán.
•	Quản lý Kho (Inventory): Quản lý phụ tùng, theo dõi tồn kho và đặt hàng mới.
2.	Mục tiêu
•	(Quản	lý): Trung tâm hóa toàn bộ hoạt động	dịch vụ,	giảm thời	gian chết	của	thiết	bị	và
tăng doanh thu.
•	(Quản	lý): Cung	cấp	sự minh	bạch hoàn toàn cho khách hàng	về	trạng thái	sửa chữa	và
lịch sử dịch vụ.
•	(Kỹ thuật): Cung cấp cho các lập trình viên một kiến trúc mô-đun rõ ràng, dễ hiểu để
phát triển và bảo trì.
•	(Kỹ thuật): Đảm bảo luồng dữ liệu nhất quán và tự động hóa các bước thủ công (ví dụ:
tạo hóa đơn từ công việc đã hoàn thành).
3.	User Stories (Các Persona chính)
•	Là Quản lý Dịch vụ, tôi muố'n xem một bảng điều khiển tổng quan về tất cả các phiếu (ticket) đang hoạt động, trạng thái của kỹ thuật viên và các chỉ số hiệu suất chính (KPI), để tôi có thể nhanh chóng xác định các vấn đề tồn đọng và phân bổ nguồn lực hiệu quả.
•	Là Kỹ thuật viên (trên di động), tôi muố'n nhận danh sách công việc hàng ngày, xem lịch sử thiết bị tại chỗ, ghi lại các bước sửa chữa, sử dụng phụ tùng và lấy chữ ký của khách hàng, để tôi có thể hoàn thành công việc hiệu quả mà không cần giấy tờ.
•	Là Khách hàng (Kỹ sư y sinh tại Bệnh viện), tôi muố'n gửi yêu cầu sửa chữa mới qua cổng thông tin, theo dõi trạng thái thời gian thực của các yêu cầu của mình và xem lịch sử dịch vụ đầy đủ của thiết bị, để tôi có thể lập kế hạch cho bộ phận của mình.
•	Là Nhân viên Kế’ toán, tôi muố'n hệ thống tự động tạo hóa đơn chi tiết khi một công
việc được đánh dấu "Hoàn thành" (với các bộ phận và nhân công đã được ghi lại), để tôi có thể gửi cho khách hàng và theo dõi thanh toán mà không cần nhập liệu thủ công.
•	Là Quản lý Kho, tôi muố'n xem mức tồn kho phụ tùng theo thời gian thực, nhận cảnh báo khi phụ tùng sắp hết và theo dõi các đơn đặt hàng, để đảm bảo kỹ thuật viên luôn có phụ tùng họ cần.
4.	Yêu cầu Chức năng (Các Mô-đun Hệ thống)
Hệ thống sẽ được xây dựng dựa trên các mô-đun cốt lõi sau:
1.	Core Workflow (Luồng công việc Cốt lõi): Quản lý logic nghiệp vụ trung tâm từ khi tạo Ticket -> Chẩn đoán -> Gửi báo giá -> Chờ duyệt -> Nhận PO -> Đặt hàng phụ tùng -> Sửa chữa -> Thử nghiệm -> Gửi hóa đơn -> Thanh toán.
2.	Core Warranty (Bảo hành Cốt lõi): Logic tự động kích hoạt, theo dõi và quản lý các yêu cầu bảo hành liên quan đến các công việc đã hoàn thành.
3.	Dashboard (Bảng điều khiển): Giao diện quản trị trung tâm với các số liệu thống kê, danh sách ticket đang hoạt động, và hoạt động gần đây.
4.	Inventory (Quản lý Kho): Quản lý danh sách phụ tùng, mức tồn kho, cảnh báo thiếu hàng, và lịch sử đơn đặt hàng.
5.	Schedule (Lịch trình): Lịch trực quan (dạng calendar) hiển thị công việc của kỹ thuật viên, cho phép kéo-thả để phân công.
6.	Reports (Báo cáo): Mô-đun phân tích để tạo báo cáo về hiệu suất kỹ thuật viên, thời gian giải quyết, doanh thu, v.v.
7.	History (Lịch sử Dịch vụ): Xem lịch sử dịch vụ hoàn chỉnh bằng cách lọc theo thiết bị hoặc khách hàng cụ thể.
8.	Tech App (Ứng dụng Di động): Giao diện đơn giản hóa cho kỹ thuật viên tại hiện trường (xem/cập nhật công việc, quản lý ảnh, lấy chữ ký).
9.	Customer Portal (Cổng thông tin Khách hàng): Giao diện cho khách hàng (bệnh viện) để gửi và theo dõi ticket, xem thiết bị của họ.
10.	Billing (Thanh toán): Quản lý hóa đơn, theo dõi trạng thái thanh toán (chờ, quá hạn, đã trả) và tích hợp với công việc đã hoàn thành.
11.	Customers (Quản lý Khách hàng): Một hệ thống CRM nhẹ để quản lý thông tin bệnh viện, danh bạ, và các hợp đồng dịch vụ.
12.	Knowledge Base (Cơ sở Tri thức): Một wiki nội bộ cho kỹ thuật viên tra cứu hướng dẫn sửa chữa, sổ tay thiết bị, và các quy trình chuẩn (SOP).
13.	Notifications (Thông báo): Hệ thống thông báo (trong ứng dụng, email, SMS) cho các sự kiện quan trọng (ví dụ: ticket mới khẩn cấp, báo giá được duyệt, thanh toán quá hạn).
5.	Non-Goals (Ngoài phạm vi)
•	Hệ thống này không phải là một hệ thống Quản lý Bệnh viện (HIS) hay Bệnh án Điện tử (EMR). Nó không quản lý dữ liệu bệnh nhân.
•	Hệ thống này không quản lý sản xuất thiết bị y tế mới.
•	Hệ thống này không phải là một hệ thống HR đầy đủ (ví dụ: chấm công, tính lương cho kỹ
thuật viên).
6.	Design Considerations (Cân nhắc Thiết kế)
•	Giao diện người dùng (UI) phải dựa trên wireframe trong file repair-workflow- complete_with_warranty.html.
•	Thiết kế phải responsive, đặc biệt là Cổng thông tin Khách hàng và Ứng dụng Di động.
•	Sử dụng các chỉ báo trạng thái trực quan (màu sắc, huy hiệu) như trong wireframe để
giúp người dùng nhanh chóng xác định trạng thái công việc, thanh toán và bảo hành.
7.	Technical Considerations (Cân nhắc Kỹ thuật)
•	Cần một cơ sở dữ liệu quan hệ (ví dụ: PostgreSQL) để quản lý các mối quan hệ phức tạp
giữa Khách hàng, Thiết bị, Ticket, Phụ tùng, Hóa đơn và Bảo hành.
•	Cần xác thực (Authentication) riêng biệt cho 3 vai trò: Admin/Manager (full access),
Technician (mobile access), và Customer (portal access).
•	Các yêu cầu kỹ thuật chi tiết sẽ được định nghĩa trong PRD của từng mô-đun.
8.	Success Metrics (Chỉ số Thành công)
•	(Quản lý): Giảm thời gian trung bình để giải quyết (MTTR) một ticket 30%.
•	(Quản lý): Tăng tỷ lệ sửa chữa thành công trong lần đầu tiên (First-Time Fix Rate) lên
90%.
•	(Quản lý): Đạt 95% độ chính xác của tồn kho phụ tùng.
•	(Khách hàng): Đạt điểm hài lòng của khách hàng (CSAT) là 4.8/5.0 trên Cổng thông tin.
•	(Kỹ thuật): Giảm 50% thời gian nhập liệu thủ công cho kỹ thuật viên và kế toán.
9.	Open Questions
• (Sẽ được giải quyết trong các PRD của từng mô-đun) 
PRD: Mô-đun Billing (Thanh toán)
1.	Giới thiệu / Tổng quan
Mô-đun Billing (Thanh toán) là trung tâm tài chính của ứng dụng. Nó cho phép bộ phận kế toán theo dõi doanh thu, quản lý hóa đơn, và quan trọng nhất, tạo ra các hóa đơn (invoice) chính xác dựa trên các công việc sửa chữa đã hoàn thành.
2.	Mục tiêu
•	Nghiệp vụ: Đảm bảo 100% công việc đã hoàn thành được lập hóa đơn chính xác và
nhanh chóng. Tăng tốc độ thu hồi công nợ bằng cách theo dõi trạng thái thanh toán.
•	Người dùng (Kế' toán): Tự động hóa quy trình tạo hóa đơn, giảm thiểu việc nhập liệu thủ
công (và sai sót) bằng cách kéo dữ liệu trực tiếp từ các ticket công việc.
•	Kỹ thuật: Xây dựng một quy trình tạo hóa đơn "bán tự động" (semi-automatic) đáng tin
cậy, liên kết chặt chẽ các bảng Jobs, PartsUsed, và Invoices.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Nhân viên Kế' toán, tôi muố'n xem các thẻ KPI ở đầu trang (Doanh thu, Chờ thanh toán, Quá hạn) để biết tình hình tài chính tổng quan.
•	Là một Nhân viên Kế' toán, tôi muố'n xem một bảng (table) gồm tất cả các hóa đơn (Invoices) đã được tạo, với khả năng lọc theo trạng thái (Paid, Pending, Overdue, Draft).
•	Là một Nhân viên Kế' toán, tôi muố'n nhấp vào một hóa đơn trong bảng để mở chi tiết (modal) của hóa đơn đó, xem lại các mục, và thực hiện các hành động (như "Gửi Email Nhắc nhở", "Ghi nhận Thanh toán").
•	(Quy trình Cốt lõi - Lựa chọn B) Là một Nhân viên Kế' toán, khi tôi nhấp vào nút "New Invoice", tôi muốn hệ thống hiển thị một danh sách các "Công việc đã Hoàn thành, Chờ lập Hóa đơn".
•	(Quy trình Cốt lõi) Là một Nhân viên Kế' toán, sau khi tôi chọn một công việc (ví dụ: #RT-2024-1840), tôi muốn hệ thống tự động tạo một "Hóa đơn Nháp" (Draft Invoice) và điền sẵn tất cả các mục (ví dụ: 6.5 giờ công, 1x Gantry Motor) vào đó.
•	(Quy trình Cốt lõi) Là một Nhân viên Kế' toán, tôi muố'n xem lại Hóa đơn Nháp, thực hiện các điều chỉnh cuối cùng (nếu cần), và nhấp vào "Gửi" (Send) để chuyển trạng thái thành "Pending" (Chờ thanh toán).
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Lưới Thống kê (KPI Grid):
o	Hệ thống phải hiển thị 4 thẻ KPI tài chính như trong wireframe (Revenue, Pending,
Overdue, Paid), được tính toán dựa trên dateRange (FR-B1).
2.	Bảng Hóa đơn (Invoice Table):
o Hệ thống phải hiển thị một bảng (table) invoice-table với các cột: Invoice #, Customer, Issue Date, Due Date, Amount, Status (Paid, Pending, Overdue, Draft) (FR-B2).
o	Hệ thống phải cung cấp các nút lọc (filter chips) cho các trạng thái này (FR-B3).
o	Nhấp vào một Invoice # phải mở Modal Chi tiết Hóa đơn (invoiceModal) ở chế độ
"Chỉ đọc/Hành động" (View/Action) (FR-B4).
3.	Quy trình Tạo Hóa đơn (Lựa chọn B - Bán tự động):
o Khi một Ticket được kỹ thuật viên đánh dấu là "Testing Passed" (Đã kiểm tra), trạng thái của nó phải được cập nhật thành READY_FOR_INVOICING (Chờ lập Hóa đơn) (FR-B5).
o Nút "New Invoice" (trên trang Billing) phải mở một modal (SelectJobToInvoiceModal) (FR-B6).
o Modal SelectJobToInvoiceModal phải gọi API GET /jobs?status=READY_FOR_INVOICING và hiển thị danh sách các công việc có thể lập hóa đơn (FR-B7).
o Khi người dùng chọn một công việc, hệ thống phải gọi một API POST /invoices/generate-draft/:jobId (FR-B8).
o API (Backend) này phải đọc jobId, kéo tất cả laborHours (giờ công) và partsUsed (phụ tùng đã dùng) liên quan, tính toán tổng tiền, tạo một bản ghi Invoice mới với trạng thái DRAFT, và trả về invoiceId mới (FR-B9).
o (Frontend) Sau khi nhận được invoiceId mới, hệ thống phải tự động mở invoiceModal (Modal Chi tiết Hóa đơn) ở chế độ "Chỉnh sửa Nháp" (Edit Draft) (FR-B10).
4.	Modal Chi tiết Hóa đơn (invoiceModal):
o Modal này phải có 2 chế độ: "View/Action" (cho hóa đơn đã gửi) và "Edit Draft" (cho hóa đơn nháp).
o Ở chế độ "Edit Draft" (FR-B10), các trường (ví dụ: số lượng, đơn giá) có thể chỉnh sửa được. Nó phải có nút "Save Draft" (Lưu nháp) và "Send Invoice" (Gửi Hóa đơn).
o Nút "Send Invoice" phải cập nhật trạng thái hóa đơn thành PENDING và gửi email cho khách hàng (FR-B11).
o Ở chế độ "View/Action" (FR-B4), các trường bị khóa (read-only). Nó phải hiển thị các nút hành động như "Record Payment" (Ghi nhận Thanh toán), "Send Reminder" (Gửi Nhắc nhở), "Download PDF" (FR-B12).
o Nút "Record Payment" phải mở một modal nhỏ hỏi về Ngày thanh toán và Phương thức, sau đó cập nhật trạng thái hóa đơn thành PAID (FR-B13).
5.	Non-Goals (Ngoài phạm vi)
•	Hệ thống này không phải là một hệ thống kế toán đầy đủ (ví dụ: không quản lý Sổ cái, Bảng cân đối kế toán).
•	Hệ thống sẽ không tích hợp trực tiếp với cổng thanh toán (Payment Gateway) trong phiên bản đầu tiên. "Record Payment" (FR-B13) là một hành động thủ công.
•	Hóa đơn được tạo hoàn toàn thủ công (Lựa chọn C) sẽ không được hỗ trợ trong V1, để đảm bảo tính toàn vẹn dữ liệu (chỉ tạo từ công việc).
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) Cần một JobsModule (Mô-đun Công việc) để quản lý Ticket (vì "Ticket" là yêu cầu ban đầu, "Job" là công việc được thực thi).
•	(Backend) TicketService (hoặc JobService) phải có logic để cập nhật trạng thái thành READY_FOR_INVOICING (FR-B5).
•	(Backend) BillingModule (Mô-đun Thanh toán) sẽ chứa InvoicesService và InvoicesController.
•	(Backend) Logic của POST /invoices/generate-draft/:jobId (FR-B8, FR-B9) là rất quan trọng. Nó cần JOIN (kết) với TicketParts, Parts (để lấy giá), và Users (để lấy giờ công và tỷ lệ) để tính toán chính xác.
•	(Frontend) Cần tạo một modal mới SelectJobToInvoiceModal.tsx.
•	(Frontend) Modal InvoiceModal.tsx (từ wireframe) cần được điều chỉnh (refactor) để hỗ trợ 2 chế độ (FR-B10, FR-B12).
7.	Success Metrics (Chỉ số Thành công)
•	Giảm 90% thời gian nhập liệu thủ công để tạo hóa đơn.
•	100% hóa đơn được tạo ra khớp chính xác với phụ tùng và giờ công đã ghi lại trong
ticket.
•	Thời gian từ khi "Job Completed" đến "Invoice Sent" giảm từ (ví dụ) 2 ngày xuống còn 4
giờ. 
PRD: Mô-đun Customers (Khách hàng)
1.	Giới thiệu / Tổng quan
Mô-đun Customers (Khách hàng) là hệ thống Quản lý Quan hệ Khách hàng (CRM) cốt lõi của ứng dụng. Nó cho phép Quản lý Dịch vụ và Quản lý Tài khoản xem, tạo, và quản lý hồ sơ của tất cả các khách hàng (ví dụ: bệnh viện). Nó cũng cung cấp một "Chế độ xem 360 độ" chi tiết về từng khách hàng, tổng hợp mọi tương tác (ticket, thiết bị, hợp đồng, hóa đơn) vào một nơi duy nhất.
2.	Mục tiêu
•	Nghiệp vụ: Cung cấp một nguồn dữ liệu đáng tin cậy (single source of truth) cho tất cả
thông tin khách hàng. Giúp quản lý tài khoản hiểu rõ "sức khỏe" và "giá trị" của từng khách hàng.
•	Người dùng: Cho phép người quản lý nhanh chóng tìm thấy thông tin liên lạc của khách
hàng, xem thiết bị của họ, và truy cập lịch sử dịch vụ đầy đủ của họ từ một modal duy nhất.
•	Kỹ thuật: Xây dựng một mô-đun CRUD (Tạo, Đọc, Cập nhật, Xóa) cho Customers và tạo
các API tổng hợp (aggregation) hiệu suất cao cho "Modal Chi tiết Khách hàng" (Customer Detail Modal).
3.	User Stories (Câu chuyện Người dùng)
•	Là một Quản lý Dịch vụ, tôi muố'n xem một lưới (grid) gồm tất cả các khách hàng (bệnh viện) của tôi, với các thông tin tóm tắt nhanh (số ticket, doanh thu).
•	Là một Quản lý Dịch vụ, tôi muố’n có thể lọc danh sách khách hàng theo "Cấp độ" (ví dụ: Platinum, Gold) hoặc "Trạng thái Hợp đồng" (ví dụ: Active) để tìm các khách hàng quan trọng nhất.
•	Là một Quản lý Dịch vụ, tôi muố’n nhấp vào nút "Add Customer" (Thêm Khách hàng) để mở một biểu mẫu (form) và tạo hồ sơ cho một bệnh viện mới (thêm địa chỉ, thông tin liên lạc chính).
•	Là một Quản lý Dịch vụ, khi tôi nhấp vào một thẻ khách hàng, tôi muố'n mở một modal "Chi tiết Khách hàng" (Customer Detail Modal) toàn diện.
•	(Trong Modal) Là một Quản lý, tôi muố'n nhấp vào tab "Contacts" (Danh bạ) để xem tất cả các Kỹ sư Y sinh và Kế toán mà tôi làm việc cùng tại bệnh viện đó.
•	(Trong Modal) Là một Quản lý, tôi muố'n nhấp vào tab "Equipment" (Thiết bị) để xem danh sách tất cả các máy móc (LINAC, CT, MRI) mà chúng tôi bảo trì tại địa điểm đó.
•	(Trong Modal) Là một Quản lý, tôi muố'n nhấp vào tab "Service History" (Lịch sử Dịch vụ) để xem dòng thời gian (timeline) tất cả các ticket đã hoàn thành cho khách hàng này.
•	(Trong Modal) Là một Quản lý, tôi muố'n nhấp vào tab "Billing" (Thanh toán) để xem
tất cả các hóa đơn (invoice) đã gửi cho khách hàng này và trạng thái của chúng.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Trang chính (Customers View):
o Hệ thống phải hiển thị một lưới (grid) các customer-card (thẻ khách hàng) (FR-C1).
o Mỗi thẻ phải hiển thị các thông tin tóm tắt như trong wireframe (Tên, Loại, Cấp độ (Tier), Thông tin liên hệ, Thống kê, Tags) (FR-C2).
o Hệ thống phải cung cấp thanh tìm kiếm (Search) và các nút lọc (Filter chips) (ví dụ: "Platinum Tier", "Active Contracts") (FR-C3).
o Nút "Add Customer" phải mở một modal (CustomerFormModal) để tạo khách hàng mới (FR-C4).
o	Nhấp vào một customer-card phải mở CustomerDetailModal (FR-C5).
2.	Modal Chi tiết Khách hàng (Customer Detail Modal):
o Đây là một modal lớn, đa tab (multi-tab) (FR-C6).
o Tab Overview (Tổng quan): Hiển thị thông tin chung, chi tiết liên hệ, và một Dòng hoạt động (Activity Feed) đã lọc theo customerId (FR-C7).
o Tab Contacts (Danh bạ): Hiển thị danh sách các Contact (Người liên hệ) liên quan đến customerId. Phải hỗ trợ CRUD (Thêm/Sửa/Xóa) cho Contacts (FR-C8).
o Tab Equipment (Thiết bị): Hiển thị danh sách các Equipment (Thiết bị) đã lọc theo customerId. API GET /equipment?customerId=... (FR-C9).
o Tab Service History (Lịch sử Dịch vụ): Hiển thị một Dòng thời gian (Timeline) các Ticket đã hoàn thành đã lọc theo customerId. API GET /history/timeline?customerId=... (FR-C10).
o Tab Contracts (Hợp đồng): Hiển thị các Contract (Hợp đồng) đã lọc theo customerId. API GET /contracts?customerId=... (FR-C11).
o Tab Billing (Thanh toán): Hiển thị một bảng (table) các Invoice (Hóa đơn) đã lọc theo customerId. API GET /invoices?customerId=... (FR-C12).
5.	Non-Goals (Ngoài phạm vi)
•	Mô-đun này không phải là một hệ thống Marketing Automation.
•	Việc chỉnh sửa các mục liên quan (ví dụ: Hóa đơn, Hợp đồng) sẽ không được thực hiện
trong modal này. Các tab này chủ yếu là "chỉ đọc" (read-only) hoặc điều hướng đến mô- đun chính (ví dụ: nhấp vào một hóa đơn sẽ đưa người dùng đến Mô-đun Billing).
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) CustomerDetailModal yêu cầu rất nhiều API tổng hợp (aggregation). Cần tạo các endpoint chuyên dụng (ví dụ: GET /customers/:id/summary) hoặc đảm bảo tất cả các service (Tickets, Billing, Contracts) hỗ trợ lọc mạnh mẽ theo customerId.
•	(Backend) Cần xác định cách tính toán các Thống kê (Stats) trên customer-card (Tickets, Revenue) một cách hiệu quả, có thể thông qua một scheduled job (công việc định kỳ)
hoặc một truy vấn (query) phức tạp.
•	(Frontend) CustomerDetailModal là một component lớn. Cần sử dụng "tải lười" (lazy loading) cho dữ liệu của các tab để cải thiện hiệu suất khi mở modal.
7.	Success Metrics (Chỉ số Thành công)
•	Thời gian để mở CustomerDetailModal (bao gồm tải tab Overview) dưới 2 giây.
•	Giảm 100% dữ liệu khách hàng trùng lặp.
•	Quản lý có thể tìm thấy thông tin liên lạc của bất kỳ khách hàng nào trong vòng 10 giây. 
PRD: Mô-đun Dashboard (Bảng điều khiển)
1.	Giới thiệu / Tổng quan
Mô-đun Dashboard là màn hình chính dành cho Quản lý Dịch vụ (Service Managers) và Điều phối viên (Dispatchers). Nó cung cấp một cái nhìn tổng quan, thời gian thực về tình trạng của tất cả các hoạt động sửa chữa, cho phép truy cập nhanh vào các công việc quan trọng và hiển thị các hoạt động mới nhất của hệ thống.
2.	Mục tiêu
•	Nghiệp vụ: Cung cấp cho ban quản lý cái nhìn nhanh (at-a-glance) về các chỉ số hiệu
suất chính (KPI) và các ticket tồn đọng.
•	Người dùng: Cho phép người quản lý nhanh chóng tìm thấy, ưu tiên và truy cập các
ticket đang hoạt động.
•	Kỹ thuật: Cung cấp một giao diện người dùng (UI) hiệu suất cao, tự động cập nhật để
phản ánh dữ liệu thời gian thực.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Quản lý, tôi muố'n xem 4 số liệu thống kê quan trọng (Chờ duyệt, Đang sửa, Chờ phụ tùng, Chờ thanh toán) ngay khi tải trang, để tôi biết công việc đang bị tắc nghẽn ở đâu.
•	Là một Quản lý, tôi muố'n xem danh sách tất cả các ticket "đang hoạt động" (chưa hoàn thành), để tôi có thể theo dõi mọi công việc đang diễn ra.
•	Là một Quản lý, tôi muố'n có khả năng lọc danh sách ticket đang hoạt động theo Trạng thái, Mức độ ưu tiên, Kỹ thuật viên được gán, và Khách hàng (Bệnh viện), để tôi có thể thu hẹp danh sách và tìm thấy chính xác những gì tôi cần.
•	Là một Điề'u phối viên, tôi muố'n nhấp vào một ticket trong danh sách và xem ngay lập tức cửa sổ chi tiết/workflow của nó, để tôi có thể cập nhật trạng thái hoặc xem lại lịch sử.
•	Là một Quản lý, tôi muốn xem một dòng thời gian (timeline) các hoạt động mới nhất (ví dụ: "Phụ tùng đã về kho", "Ticket #1847 đã được gán"), để tôi nắm bắt được các sự kiện quan trọng khi chúng xảy ra.
•	Là một Người dùng, tôi muố'n có các nút "Hành động Nhanh" (Quick Actions) rõ ràng để "Tạo Ticket Mới" hoặc điều hướng đến các mô-đun quan trọng khác.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Lưới Thống kê (KPI Grid):
o Hệ thống phải hiển thị 4 thẻ thống kê (stat cards) như trong wireframe: "Pending Approval", "In Progress", "Pending Parts", "Awaiting Payment".
o	Mỗi thẻ phải hiển thị một con số, là tổng số lượng ticket hiện đang ở trạng thái tương
ứng.
o Các con số này phải được cập nhật tự động (real-time) khi trạng thái của ticket thay đổi trong hệ thống.
2.	Danh sách Ticket Đang hoạt động (Active Tickets List):
o Hệ thống phải hiển thị một danh sách các ticket có trạng thái không phải là "Completed", "Cancelled", hoặc "Warranty Expired".
o	Mỗi mục ticket trong danh sách (ticket card) phải hiển thị các thông tin tối thiểu:
Ticket ID, Mức độ ưu tiên (dạng huy hiệu màu), Tên Thiết bị, Địa điểm (Bệnh viện), Trạng thái Workflow (chuỗi đầy đủ, ví dụ: "Awaiting Customer Approval"), và Tên Kỹ thuật viên được gán.
o Khi nhấp vào bất kỳ đâu trên một ticket card, hệ thống phải mở ra modal "Chi tiết Ticket / Quản lý Workflow" (sẽ được định nghĩa trong một PRD khác).
3.	Bộ lọc Nâng cao (Advanced Filter) - (Dựa trên lựa chọn 1D):
o Hệ thống phải cung cấp một khu vực bộ lọc cho danh sách "Active Tickets".
o	Bộ lọc phải cho phép người dùng chọn (có thể chọn nhiều) từ các trường sau:
■	Trạng thái: (ví dụ: Awaiting Approval, PO Received, Repairing, Parts Ordered,
v.v.)
■	Mức độ ưu tiên: (High, Medium, Low)
■	Kỹ thuật viên: (Một danh sách tất cả các kỹ thuật viên đang hoạt động)
■	Khách hàng: (Một danh sách tất cả các bệnh viện/khách hàng)
o Danh sách ticket phải tự động cập nhật (hoặc sau khi nhấp "Apply") để phản ánh các tiêu chí lọc.
o Hệ thống phải có nút "Xóa bộ lọc" (Clear Filters).
4.	Panel Hoạt động Gần đây (Recent Activity):
o Hệ thống phải hiển thị một danh sách dạng timeline của 5-10 sự kiện hệ thống mới nhất (ví dụ: Ticket Created, Status Changed, Parts Arrived, Invoice Sent).
o	Mỗi mục phải hiển thị tiêu đề sự kiện và thời gian (ví dụ: "15 phút trước").
5.	Panel Hành động Nhanh (Quick Actions):
o	Hệ thống phải	cung	cấp	một nút	"Create New Ticket" (mở modal tạo ticket).
o	Hệ thống phải	cung	cấp	các liên	kết điều hướng rõ ràng đến các mô-đun: Reports,
Inventory, và Schedule.
5.	Non-Goals (Ngoài phạm vi)
•	Mô-đun này sẽ không xử lý việc chỉnh sửa hay tạo ticket (việc đó được thực hiện bởi các
modal riêng biệt). Nó chỉ hiển thị dữ liệu và kích hoạt các modal đó.
•	Mô-đun này sẽ không hiển thị các báo cáo phân tích sâu (ví dụ: biểu đồ doanh thu, hiệu suất) - việc đó thuộc về Mô-đun Reports.
6.	Design Considerations (Cân nhắc Thiết kế)
•	Tuân thủ nghiêm ngặt bố cục 2 cột (2fr - 1fr) như trong repair-workflow- complete_with_warranty.html.
•	Danh sách ticket phải dễ đọc, với các chỉ báo màu sắc rõ ràng cho Mức độ ưu tiên và Trạng thái.
•	Bộ lọc nâng cao (1D) có thể được triển khai dưới dạng một nút "Filter" mở ra một pop- up/modal chứa các tùy chọn, để giữ cho giao diện chính sạch sẽ.
7.	Technical Considerations (Cân nhắc Kỹ thuật)
•	Dữ liệu trên Dashboard (đặc biệt là KPI và Active Tickets) cần được làm mới thường xuyên. Cân nhắc sử dụng WebSocket (ví dụ: Socket.io) để đẩy (push) các cập nhật từ máy chủ, hoặc sử dụng cơ chế polling (lấy dữ liệu định kỳ, ví dụ: 30 giây một lần).
•	API endpoint cho danh sách ticket phải hỗ trợ đầy đủ các tham số truy vấn (query params) cho việc lọc (status, priority, technicianId, customerId).
•	Logic lọc nên được thực hiện ở phía máy chủ (backend) để đảm bảo hiệu suất, tránh tải hàng ngàn ticket về phía máy khách (frontend) rồi mới lọc.
•	Danh sách ticket nên hỗ trợ phân trang (pagination) hoặc tải vô hạn (virtual scrolling) nếu số lượng ticket đang hoạt động dự kiến là lớn (ví dụ: > 50).
8.	Success Metrics (Chỉ số Thành công)
•	Thời gian tải Dashboard dưới 2 giây.
•	Người quản lý có thể tìm thấy bất kỳ ticket nào đang hoạt động bằng cách sử dụng bộ
lọc trong vòng 15 giây.
•	Số lần nhấp chuột trung bình để từ Dashboard đi đến một hành động chính (như tạo
ticket, xem lịch) là 1. 
PRD: Mô-đun Data Import (Nhập Dữ liệu)
1.	Giới thiệu / Tổng quan
Mô-đun Nhập Dữ liệu (Data Import) cung cấp cho Quản trị viên (Admin) khả năng nhập (import) hàng loạt dữ liệu "master" (dữ liệu gốc) vào hệ thống từ các file Excel (.xlsx). Đây là một chức năng quan trọng để khởi tạo (setup) hệ thống ban đầu và thực hiện các cập nhật hàng loạt.
Dựa trên Yêu cầu 3B, chức năng này sẽ không nằm trên một trang riêng biệt, mà được tích hợp vào các mô-đun quản trị liên quan.
2.	Mục tiêu
•	Nghiệp vụ: Giảm đáng kể thời gian và sai sót khi nhập liệu thủ công hàng ngàn mục (linh
kiện, khách hàng) khi triển khai hệ thống lần đầu.
•	Người dùng (Admin): Cung cấp một quy trình 5 bước đơn giản: (1) Tải file mẫu, (2) Điền
dữ liệu, (3) Tải file lên (upload), (4) Xem trước/Xác nhận, (5) Hoàn tất.
•	Kỹ thuật: Xây dựng một trình phân tích (parser) Excel phía backend mạnh mẽ, hỗ trợ
logic "Upsert" (Cập nhật hoặc Thêm mới) và xử lý giao dịch (transaction) an toàn.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Admin, khi thiết lập hệ thống, tôi muố'n vào trang Inventory (Kho) và thấy một nút "Import Parts" (Nhập Linh kiện).
•	Là một Admin, tôi muốn nhấp vào nút "Import" và được cung cấp một link "Download Template" (Tải File Mẫu) để tôi biết chính xác các cột cần điền.
•	Là một	Admin, tôi muố'n	tải	lên file Excel đã điền của mình (ví	dụ: 1000 linh kiện).
•	Là một	Admin, tôi muố'n	hệ	thống (theo Logic 2C - Upsert):
o	Tạo mới 800 linh kiện chưa có trong CSDL (dựa trên part_number).
o	Cập nhật 200 linh kiện đã tồn tại (ví dụ: cập nhật stock và price của chúng).
•	Là một Admin, nếu có lỗi (ví dụ: Dòng 50, stock không phải là số), tôi muốn hệ thống báo lỗi rõ ràng và không thay đổi (rollback) bất kỳ dữ liệu nào (giao dịch an toàn).
•	Là một Admin, tôi muố'n lặp lại quy trình này cho tất cả các dữ liệu master: Parts (Linh kiện), Customers (Khách hàng), EquipmentModels (Loại Thiết bị), Equipment (Thiết bị Cụ thể), và SparePartList (BOM).
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Giao diện (UI - Tích hợp) (Logic 3B):
o Trang InventoryPage phải có nút "Import Parts" (FR-I1).
o Trang CustomersPage phải có nút "Import Customers" (FR-I2).
o Trang EquipmentPage (hoặc nơi quản lý EquipmentModels) phải có 3 nút: "Import Equipment Models", "Import Equipment (Assets)", và "Import Spare Part List (BOM)" (FR-I3).
2.	Quy trình Import (Modal):
o Khi nhấp vào bất kỳ nút "Import" nào, một modal (ImportModal) phải xuất hiện (FR- I4).
o Modal phải hiển thị 2 bước:
■	Bước 1 (Template): Cung cấp link "Download .xlsx Template" (Tải File Mẫu) (FR-
I5).
■	Bước 2 (Upload): Cung cấp một vùng kéo-thả (drag-and-drop) để tải file Excel
lên (FR-I6).
o Sau khi tải lên, hệ thống phải hiển thị một bản xem trước (preview) (ví dụ: 5 dòng đầu tiên) và một tóm tắt (ví dụ: "Tìm thấy 800 mục mới, 200 mục sẽ được cập nhật") (FR-I7).
o Nút "Confirm Import" (Xác nhận Nhập) sẽ bắt đầu quá trình (FR-I8).
3.	Backend: Logic Phân tích (Parsing) và Giao dịch (Transaction):
o Backend phải có một DataImportService sử dụng thư viện (ví dụ: xlsx) để đọc file Excel (FR-I9).
o Quan trọng: Mọi quy trình import phải được bọc trong một giao dịch CSDL (Database Transaction). Nếu bất kỳ hàng (row) nào thất bại, toàn bộ (all) quá trình import phải được rollback (cuộn lại) (FR-I10).
4.	Backend: Logic "Upsert" (Logic 2C):
o Import Parts (Linh kiện): Upsert vào parts (Bảng 11) dựa trên part_number (FR-I11).
o Import Customers (Khách hàng): Upsert vào customers (Bảng 2) dựa trên name hoặc tax_id (FR-I12).
o Import EquipmentModels (Loại Thiết bị): Upsert vào equipment_models (Bảng 4) dựa trên model_number (FR-I13).
5.	Backend: Logic Import Phức tạp (Liên kết):
o Import Equipment (Thiết bị): (FR-I14)
■	File Excel phải có các cột chuỗi (string): serial_number, customer_name (hoặc customer_tax_id), model_number.
■	Logic backend phải (1) tìm customer_id từ customer_name, (2) tìm model_id từ model_number, (3) Upsert vào equipment (Bảng 5) dựa trên serial_number, liên kết các ID đã tìm thấy.
o Import SparePartList (BOM): (FR-I15)
■	File Excel phải có 2 cột: model_number, part_number.
■	Logic backend phải (1) tìm model_id, (2) tìm part_id, (3) Upsert vào equipment_model_parts (Bảng 12) dựa trên cặp (pair) ID.
6.	Xử lý Lỗi (Error Handling):
o	Nếu import thất bại (ví dụ: customer_name không tìm thấy ở Dòng 5), backend phải
(1)	Rollback giao dịch, (2) Trả về lỗi 400 (Bad Request) với thông báo rõ ràng (ví dụ: "Lỗi ở Dòng 5: Không tìm thấy Khách hàng 'Bệnh viện ABC'") (FR-I16).
5.	Non-Goals (Ngoài phạm vi)
•	Tính năng này không nhập dữ liệu giao dịch (transactional data) (ví dụ: các Tickets hoặc Invoices cũ). Nó chỉ dành cho dữ liệu master.
•	Tính năng này không hỗ trợ file .csv (chỉ .xlsx trong V1).
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) Cài đặt thư viện xlsx (hoặc tương tự) để đọc file Excel.
•	(Backend) DataImportService sẽ rất phức tạp và cần được inject (tiêm) nhiều service khác (CustomersService, PartsService, EquipmentModelsService).
•	(Backend) Việc sử dụng QueryRunner và transaction (ví dụ: của TypeORM) là bắt buộc (FR-I10).
•	(Frontend) Cần tạo một component ImportModal.tsx có thể tái sử dụng, nhận importType (ví dụ: 'parts', 'customers') làm prop.
7.	Success Metrics (Chỉ số Thành công)
•	Admin có thể nhập (import) 5,000 linh kiện (Parts) trong vòng dưới 60 giây.
•	100% các lỗi nhập liệu (ví dụ: sai model_number) được phát hiện và rollback chính xác
(không có dữ liệu "rác").
•	Giảm 95% thời gian thiết lập (setup) hệ thống cho một khách hàng mới. 
PRD: Mô-đun Equipment (Quản lý Thiết bị CRUD)
1.	Giới thiệu / Tổng quan
Đây là mô-đun "Sổ cái" (Master Registry) cho tất cả các tài sản vật lý (thiết bị y tế) mà công ty quản lý hoặc bảo trì. Trong khi các mô-đun khác (History, Portal, Customers) đọc (read) dữ liệu thiết bị, mô-đun này chịu trách nhiệm ghi (write) dữ liệu đó (Tạo, Sửa, Xóa - CRUD).
Dựa trên Yêu cầu 1.B, việc tạo thiết bị được thực hiện ở hai nơi:
1.	Admin (Web): Quản lý tập trung, nhập liệu hàng loạt, liên kết thiết bị với khách hàng.
2.	Kỹ thuật viên (Mobile): Tạo tại hiện trường, thường là khi lắp đặt một máy mới, và phải hoạt động offline.
2.	Mục tiêu
•	Nghiệp vụ: Tạo một nguồn dữ liệu đáng tin cậy (single source of truth) cho mọi thiết bị
mà công ty chịu trách nhiệm, bao gồm cả lịch sử sở hữu (liên kết với khách hàng).
•	Người dùng (Admin): Cung cấp một giao diện web mạnh mẽ để quản lý toàn bộ danh
mục thiết bị.
•	Người dùng (Kỹ thuật viên): Cung cấp một cách thức di động, offline-first để nhanh
chóng đăng ký (register) một thiết bị mới tại chỗ.
•	Kỹ thuật: Mở rộng Mô hình Dữ liệu (Equipment) và đảm bảo logic đồng bộ (Sync logic)
của Ứng dụng Di động hỗ trợ việc tạo thiết bị.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Admin, tôi muố'n có một trang "Equipment" (Thiết bị) mới trên thanh điều hướng chính (admin web app), nơi tôi có thể xem, lọc, và tìm kiếm tất cả thiết bị từ tất cả các khách hàng.
•	Là một Admin, tôi muốn nhấp vào nút "Add Equipment" (Thêm Thiết bị) trên trang web, mở một biểu mẫu (form) chi tiết, nơi tôi có thể nhập Tên, Model, S/N, và (quan trọng) chọn Customer (Khách hàng) sở hữu thiết bị này từ danh sách.
•	Là một Admin, tôi muố'n có thể "Chỉnh sửa" (Edit) một thiết bị hiện có để cập nhật thông tin (ví dụ: S/N, Vị trí) hoặc "Hủy kích hoạt" (Deactivate) nó.
•	(Yêu cầu B) Là một Kỹ thuật viên (trên Di động), khi tôi đang ở chỗ khách hàng (ví dụ: Bệnh viện Bạch Mai) để lắp máy mới, tôi muốn nhấp vào một nút (ví dụ: "Add New Equipment") trong ứng dụng di động của mình.
•	(Yêu cầu B) Là một Kỹ thuật viên (trên Di động), tôi muố'n điền vào một biểu mẫu (form) đơn giản (Tên, S/N, Model) và khi lưu, ứng dụng phải tự động liên kết thiết bị mới
này với khách hàng mà tôi đang làm việc (customerId từ công việc hiện tại).
•	(Yêu cầ'u B) Là một Kỹ thuật viên (trên Di động), tôi muố’n có thể thực hiện việc thêm thiết bị này ngay cả khi đang ở tầng hầm (không có mạng), và tin tưởng rằng nó sẽ tự động đồng bộ (sync) lên máy chủ khi tôi có mạng trở lại.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Mô hình Dữ liệu Equipment (Mở rộng):
o Bảng Equipment (trong CSDL chính) phải có một khóa ngoại (foreign key) customerId (liên kết với bảng Customers) (FR-E1).
o Các trường phải bao gồm: name, modelNumber, serialNumber, manufacturer, location (ví dụ: "Phòng 301, Tầng 3"), installDate, status ('ACTIVE', 'INACTIVE').
2.	Giao diện Admin (Web CRUD):
o	Phải có một trang mới (/equipment) trong frontend-admin (FR-E2).
o Trang này phải có một bảng (table) hiển thị tất cả thiết bị, có thể lọc (filter) (theo customerId, manufacturer) và tìm kiếm (search) (theo serialNumber, name) (FR-E3).
o Trang này phải có nút "Add Equipment" (Thêm Thiết bị) (FR-E4).
o Nút này phải mở EquipmentFormModal. Form này phải bao gồm một trường dropdown/searchable để chọn Customer (bắt buộc) (FR-E5).
o Bảng (Task 2) phải có các nút "Edit" (Sửa) (mở EquipmentFormModal ở chế độ Edit) và "Deactivate" (Hủy kích hoạt) (FR-E6).
3.	Giao diện Kỹ thuật viên (Mobile CRUD) (Yêu cầu B):
o	Ứng dụng Di động phải có một nút "Add Equipment" (có thể trong HomeScreen
hoặc JobDetailScreen) (FR-E7).
o Nút này phải mở một màn hình/form mới (AddEquipmentScreen) với các trường đơn giản (Tên, S/N, Model) (FR-E8).
o Khi Kỹ thuật viên "Lưu" (Save), ứng dụng phải tạo một bản ghi Equipment mới trong Cơ sở dữ liệu cục bộ (Local DB) (FR-E9).
o Bản ghi cục bộ này phải tự động được gán customerId (lấy từ job.customerId của công việc hiện tại) (FR-E10).
o Bản ghi cục bộ này phải được đánh dấu (flagged) để đồng bộ (ví dụ: _status = 'created') (FR-E11).
4.	Đồng bộ hóa (Sync) (Yêu cầu B):
o CSDL cục bộ (Local DB) của Ứng dụng Di động (schema.ts) phải được cập nhật để bao gồm bảng equipment (FR-E12).
o SyncService (của Ứng dụng Di động) phải được cập nhật để xử lý việc "đẩy" (push) các bản ghi equipment mới (Task 3.3) lên backend (FR-E13).
o Endpoint POST /sync/push (của Backend) phải được cập nhật để có thể nhận và tạo các bản ghi equipment mới từ Kỹ thuật viên (FR-E14).
5.	Non-Goals (Ngoài phạm vi)
•	Tính năng này không quản lý "Hợp đồng" (Contracts) liên quan đến thiết bị. (Việc đó được xử lý trong Mô-đun Customers).
•	Kỹ thuật viên (Mobile) không thể Chỉnh sửa (Edit) hoặc Xóa (Delete) thiết bị. Họ chỉ có
thể Tạo (Create) mới. Việc Chỉnh/Xóa là đặc quyền của Admin (Web).
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) equipment.controller.ts cần các endpoint CRUD (GET, POST, PATCH) được bảo vệ bởi AdminGuard.
•	(Backend) sync.service.ts (từ Epic 8.0) cần được sửa đổi để xử lý logic push cho equipment (FR-E14).
•	(Frontend Admin) EquipmentPage.tsx sẽ là trang cấp cao mới.
•	(Frontend Mobile) schema.ts (từ Epic 8.0) cần được cập nhật. AddEquipmentScreen.tsx là màn hình mới. SyncService.ts (Mobile) cần được sửa đổi.
7.	Success Metrics (Chỉ số Thành công)
•	100% thiết bị trong hệ thống được liên kết (mapped) chính xác với một khách hàng
(customerId).
•	Kỹ thuật viên (offline) có thể thêm một thiết bị mới và nó đồng bộ thành công (trong
vòng 30 giây) khi có mạng.
•	Admin có thể tìm thấy bất kỳ thiết bị nào (theo S/N hoặc Khách hàng) trong vòng 10 giây. 
PRD: Mô-đun Inventory (Kho)
1.	Giới thiệu / Tổng quan
Mô-đun Inventory (Kho) cung cấp cho Quản lý Kho (Inventory Managers) một giao diện trung tâm để theo dõi tất cả các phụ tùng, giám sát mức tồn kho, xác định các mặt hàng cần đặt hàng và cập nhật thủ công trạng thái của các đơn hàng đó.
2.	Mục tiêu
•	Nghiệp vụ:	Đảm	bảo đủ phụ tùng quan	trọng cho các công	việc	sửa	chữa,	giảm	thiểu	sự
chậm trễ do thiếu phụ tùng.
•	Người dùng: Cho phép Quản lý Kho nhanh chóng xác định các mặt hàng "Low Stock"
(Tồn kho thấp) và cập nhật trạng thái đơn hàng (đã đặt hàng, đã nhận hàng) một cách thủ công.
•	Kỹ thuật: Cung cấp một API CRUD (Create, Read, Update, Delete) đáng tin cậy cho các
phụ tùng (Part) và hiển thị dữ liệu chính xác.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Quản lý Kho, tôi muố'n xem danh sách tất cả các phụ tùng trong hệ thống, bao gồm Part Number, Tên, Tồn kho (Stock), và Tồn kho Tối thiểu (Min. Stock).
•	Là một Quản lý Kho, tôi muố'n xem 4 thẻ KPI ở đầu trang (Tổng số loại phụ tùng, Tồn kho thấp, Đang đặt hàng, Giá trị tồn kho) để có cái nhìn tổng quan nhanh.
•	Là một Quản lý Kho, tôi muố'n có một nút/tab "Low Stock" để lọc ngay lập tức danh sách chỉ hiển thị các phụ tùng có Stock thấp hơn Min. Stock.
•	Là một Quản lý Kho, tôi muố'n có thể tìm kiếm phụ tùng theo Tên (Description) hoặc Part Number.
•	Là một Quản lý Kho, tôi muố'n có thể nhấp vào một phụ tùng trong danh sách để mở modal "Chi tiết/Chỉnh sửa Phụ tùng".
•	Là một Quản lý Kho (Theo Lựa chọn A - Thủ công), tôi muố'n trong modal "Chỉnh sửa Phụ tùng", có thể cập nhật thủ công các trường, bao gồm:
o Thay đổi Stock (ví dụ: khi nhận hàng)
o Thay đổi Min. Stock
o Thay đổi Location (Vị trí)
o Thay đổi Status (ví dụ: từ "Order Needed" sang "On Order" sau khi tôi đặt hàng qua điện thoại/email).
•	Là một Quản lý Kho, tôi muố'n có một nút "Add Part" (Thêm Phụ tùng) để mở một modal cho phép tôi thêm một loại phụ tùng mới vào cơ sở dữ liệu.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Lưới Thống kê (KPI Grid):
o Hệ thống phải hiển thị 4 thẻ KPI: "Total Parts" (Tổng số SKU), "Low Stock" (Số lượng SKU có stock < min_stock), "On Order" (Số lượng SKU có status "On Order"), và "Inventory Value" (Tổng giá trị stock * part_cost).
2.	Thanh Tìm kiếm và Lọc:
o Hệ thống phải cung cấp một thanh tìm kiếm cho phép tìm kiếm theo Part Number và Description.
o Hệ thống phải cung cấp các nút lọc nhanh (tương tự như wireframe): "Low Stock" (lọc stock < min_stock) và "Orders" (lọc status = 'On Order').
3.	Bảng Danh sách Phụ tùng (Parts Table):
o Hệ thống phải hiển thị một bảng (table) các phụ tùng với các cột: Part Number, Description (Tên/Mô tả), Equipment (Loại thiết bị tương thích), Stock Level (Số lượng + thanh % trực quan), Min. Stock, Location, và Status.
o Thanh "Stock Level" phải đổi màu: Đỏ (Low), Vàng (Medium), Xanh (High) dựa trên tỷ lệ stock / min_stock.
o	Cột "Status" phải hiển thị huy hiệu (badge) rõ ràng (ví dụ: "In Stock", "Order
Needed", "On Order").
4.	Thêm Phụ tùng Mới (Add Part):
o Nút "Add Part" phải mở ra một modal.
o Modal này phải chứa các trường để tạo một Part mới (ví dụ: Part Number, Description, Equipment, Initial Stock, Min. Stock, Location, Cost).
5.	Chỉnh sửa Phụ tùng (Edit Part) - (Quy trình Thủ công):
o Nhấp vào một hàng (row) trong bảng phải mở ra modal "Edit Part".
o Modal này phải cho phép người dùng chỉnh sửa tất cả các trường quan trọng.
o Quan trọng: Người dùng phải có khả năng thay đổi Stock (ví dụ: nhập số lượng mới sau khi nhận hàng) và Status (ví dụ: chọn "On Order" từ danh sách dropdown).
o Khi Stock được cập nhật, hệ thống phải tự động tạo một bản ghi InventoryLog (Lịch sử Kho) để theo dõi (ví dụ: "Admin đã cập nhật stock từ 5 lên 15").
5.	Non-Goals (Ngoài phạm vi)
•	(Theo Lựa chọn A) Hệ thống sẽ không tạo hoặc quản lý "Đơn Đặt Hàng" (Purchase Orders - POs).
•	Hệ thống sẽ không tích hợp với nhà cung cấp (Suppliers).
•	Việc "Đặt hàng" (Ordering) xảy ra bên ngoài ứng dụng. Hệ thống này chỉ ghi lại rằng đơn
hàng "Đang trên đường về" (On Order).
•	Hệ thống sẽ không tự động trừ kho (deduct stock) khi kỹ thuật viên sử dụng. (Lưu ý: Việc
này sẽ được xử lý trong Mô-đun "Ticket" khi kỹ thuật viên hoàn thành công việc).
6.	Design Considerations (Cân nhắc Thiết kế)
•	Giao diện phải tuân thủ chặt chẽ wireframe, đặc biệt là bố cục bảng và các thẻ KPI.
•	Thanh trực quan "Stock Level" rất quan trọng, cần thể hiện rõ ràng mức độ tồn kho.
•	Modal "Edit Part" nên rõ ràng và dễ dàng cho việc cập nhật nhanh (đặc biệt là Stock và
Status).
7.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) API GET /parts phải hỗ trợ các tham số lọc: search (cho Part Number/Description), isLowStock (boolean), status.
•	(Backend) API PATCH /parts/:id phải xử lý logic cập nhật Part và đồng thời tạo một bản ghi InventoryLog.
•	(Backend) API POST /parts phải xử lý việc tạo Part mới.
•	(Frontend) Sử dụng useDebounce cho thanh tìm kiếm để tránh gọi API liên tục khi gõ.
•	(Frontend) Logic tính toán màu sắc cho thanh "Stock Level" nên được đóng gói trong component StockLevelBar.
8.	Success Metrics (Chỉ số Thành công)
•	Giảm 90% các trường hợp kỹ thuật viên không thể sửa chữa do thiếu phụ tùng (stock-outs).
•	100% phụ tùng có stock < min_stock phải được hiển thị chính xác trong bộ lọc "Low
Stock".
•	Thời gian để Quản lý Kho cập nhật trạng thái của 10 phụ tùng từ "Order Needed" sang "On Order" dưới 5 phút. 
PRD: Mô-đun Knowledge Base (Tri thức)
1.	Giới thiệu / Tổng quan
Mô-đun Knowledge Base (KB - Cơ sở Tri thức) là một thư viện tài liệu nội bộ (wiki) dành cho các kỹ thuật viên và nhân viên. Nó là nơi lưu trữ tập trung các tài liệu quan trọng như Hướng dẫn Sửa chữa, Sổ tay Thiết bị, Quy trình Vận hành Tiêu chuẩn (SOP), và Hướng dẫn An toàn.
Mô-đun này có 3 thành phần chính:
1.	Trang Duyệt (Knowledge View): Nơi người dùng tìm kiếm, duyệt theo danh mục và xem các bài viết phổ biến/mới.
2.	Trình xem Bài viết (Article Modal): Nơi người dùng đọc nội dung của một bài viết cụ thể.
3.	Trình tạo/sửa Bài viết (New Article Modal): Nơi người dùng có thẩm quyền (ví dụ: Senior Techs, Managers) tạo và chỉnh sửa các bài viết.
2.	Mục tiêu
•	Nghiệp vụ:	Giảm thời	gian	sửa	chữa	bằng cách cung	cấp cho	kỹ	thuật	viên quyền truy
cập ngay lập tức vào các quy trình chính xác. Chuẩn hóa các quy trình sửa chữa và an toàn trong toàn tổ chức.
•	Người dùng: Cho phép kỹ thuật viên nhanh chóng tìm thấy (qua tìm kiếm hoặc danh
mục) hướng dẫn họ cần để giải quyết một vấn đề tại hiện trường.
•	Kỹ	thuật:	Xây dựng	một hệ thống CMS (Quản	lý Nội	dung) nhẹ,	hỗ	trợ	việc	tạo, lưu trữ và
truy xuất nội dung có cấu trúc (structured content).
3.	User Stories (Câu chuyện Người dùng)
•	Là một Kỹ thuật viên, tôi muố'n vào trang Knowledge Base và sử dụng thanh tìm kiếm để nhập một mã lỗi (ví dụ: "E-4567") và tìm thấy ngay các bài viết khắc phục sự cố liên quan.
•	Là một Kỹ thuật viên, tôi muố'n duyệt (browse) theo "Danh mục" (ví dụ: "Varian TrueBeam" hoặc "Troubleshooting") để tìm tất cả các tài liệu liên quan.
•	Là một Kỹ thuật viên, khi tôi mở một bài viết, tôi muố’n thấy một định dạng rõ ràng, có cấu trúc với "Tổng quan", "Công cụ Yêu cầu", và "Các bước Thực hiện" (Step-by- Step).
•	Là một Kỹ thuật viên Cấp cao (Senior), tôi muố'n nhấp vào nút "New Article" (Bài viết Mới) để mở một biểu mẫu (form) chi tiết, nơi tôi có thể viết một hướng dẫn mới, thêm các bước, cảnh báo an toàn, và đính kèm sơ đồ.
•	Là một Kỹ thuật viên Cấp cao, tôi muố'n có thể chỉnh sửa một bài viết hiện có để cập nhật thông tin mới.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Trang chính (Knowledge View):
o	Hệ thống phải hiển thị một thanh tìm kiếm lớn (kb-search-bar) (FR-K1).
o	Hệ thống phải hiển thị các thẻ Danh mục (kb-category-card) (ví dụ: Equipment,
Procedures, Troubleshooting) (FR-K2).
o	Hệ thống phải hiển thị hai danh sách: "Popular Articles" (Bài viết Phổ biến) và
"Recently Updated" (Cập nhật Gần đây) (FR-K3).
o	Nhấp vào một thẻ bài viết (kb-article-card) phải mở kbArticleModal (FR-K4).
o Nút "New Article" phải mở newArticleModal (FR-K5).
2.	Trình xem Bài viết (kbArticleModal):
o Modal phải hiển thị nội dung bài viết có cấu trúc, bao gồm Tiêu đề, Meta data, Tổng quan (Overview), các Mục (Sections), và các Hộp thông tin (Info Box) (FR-K6).
o	Nội dung (ví dụ: các bước, checklist) phải được render chính xác dựa trên dữ liệu đã
lưu (ví dụ: lưu dưới dạng Markdown hoặc JSON) (FR-K7).
3.	Trình tạo/sửa Bài viết (newArticleModal):
o	Hệ thống phải cung cấp một biểu mẫu (form) nhiều phần (multi-section) như trong
wireframe (FR-K8).
o Form phải cho phép nhập các trường có cấu trúc: Title, Category, Summary, Overview, Safety Warnings, Tools, Parts, Step-by-Step, Tags, v.v. (FR-K9).
o	Hệ thống phải cho phép tải lên (upload) các file đính kèm (Ảnh, Sơ đồ, PDF) (FR-
K10).
o Form phải hỗ trợ cả hai chế độ "Create" (Tạo mới) và "Edit" (Chỉnh sửa - khi mở từ một bài viết hiện có).
o Khi submit, hệ thống phải lưu bài viết vào CSDL (FR-K11).
5.	Non-Goals (Ngoài phạm vi)
•	Đây không phải là Google Docs. Trình soạn thảo "Step-by-Step" không phải là một trình soạn thảo văn bản (rich-text editor) WYSIWYG phức tạp, mà là một textarea (ô văn bản) lớn (có thể hỗ trợ Markdown đơn giản).
•	Tính năng bình luận (commenting) hoặc xếp hạng (rating) bài viết sẽ không có trong V1 (mặc dù wireframe có gợi ý).
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) Lưu trữ Nội dung: Quyết định cách lưu trữ nội dung bài viết.
o Cách 1 (Đơn giản): Lưu toàn bộ nội dung (Overview, Steps, v.v.) dưới dạng một trường content (kiểu text) sử dụng Markdown. Frontend sẽ chịu trách nhiệm render Markdown thành HTML.
o Cách 2 (Phức tạp hơn): Lưu dưới dạng JSONB có cấu trúc (ví dụ: { "overview": "...", "steps": [{"title": "Step 1", "desc": "..."}] }).
o	Khuyến nghị: Bắt đầu với Cách 1 (Markdown) vì nó linh hoạt.
•	(Backend) Tìm kiế'm: Cần implement Tìm kiếm Toàn văn (Full-Text Search) (ví dụ: PostgreSQL tsvector) trên các trường title, tags, và content để hỗ trợ thanh tìm kiếm (FR-K1).
•	(Backend) Lưu trữ File: Cần một giải pháp lưu trữ file (ví dụ: S3, Google Cloud Storage) để xử lý việc tải lên file đính kèm (FR-K10).
•	(Frontend) Cần một thư viện react-markdown (hoặc tương tự) để render nội dung bài viết một cách an toàn trong kbArticleModal (FR-K7).
7.	Success Metrics (Chỉ số Thành công)
•	Thời gian tìm kiếm (từ khi gõ đến khi có kết quả) dưới 1 giây.
•	Giảm 20% các ticket "lặp lại" (do kỹ thuật viên đã có thể tự tìm và giải quyết).
•	Kỹ thuật viên Cấp cao đóng góp ít nhất 5 bài viết mới mỗi tháng. 
PRD: Mô-đun Notifications (Thông báo)
1.	Giới thiệu / Tổng quan
Mô-đun Thông báo (Notifications) là hệ thống cảnh báo thời gian thực của ứng dụng. Nó thông báo cho người dùng (chủ yếu là Quản lý/Admin) về các sự kiện quan trọng xảy ra trong hệ thống, cho phép họ phản ứng ngay lập tức. Các thông báo được đẩy (pushed) đến người dùng trong thời gian thực mà không cần tải lại trang.
2.	Mục tiêu
•	Nghiệp vụ: Đảm bảo các sự kiện quan trọng (ví dụ: "Thiết bị Hỏng Khẩn cấp", "Báo giá Được duyệt", "Thanh toán Quá hạn") được xử lý ngay lập tức, giảm thời gian trễ trong quy trình.
•	Người dùng: Cung cấp cho người dùng một bảng thông báo (panel) rõ ràng, có thể lọc
được, giúp họ nắm bắt thông tin và thực hiện các hành động nhanh (quick actions).
•	Kỹ thuật: Implement một hệ thống WebSocket mạnh mẽ để đẩy (push) thông báo từ
backend đến các client (frontend) đã kết nối.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Quản lý, khi một khách hàng gửi một ticket "Khẩn cấp", tôi muố'n thấy một thông báo (notification) màu đỏ xuất hiện ngay lập tức trên biểu tượng chuông (bell icon), để tôi có thể xử lý ngay.
•	Là một Quản lý, tôi muố'n nhấp vào biểu tượng chuông để mở một bảng (panel) hiển thị tất cả các thông báo chưa đọc của tôi.
•	Là một Quản lý, tôi muố'n có thể lọc các thông báo của mình theo tab (ví dụ: "Urgent", "Jobs", "System") để tập trung vào những gì quan trọng.
•	Là một Kế' toán, khi một công việc được hoàn thành (Status: "Work Completed"), tôi muốn nhận được một thông báo (ví dụ: "Job #RT-1840 completed. Ready for invoicing.") với một nút "Generate Invoice" (Tạo Hóa đơn) ngay trên đó.
•	Là một Quản lý, tôi muố'n nhấp vào nút "Mark all as read" (Đánh dấu tất cả đã đọc) để dọn dẹp (clear) bộ đếm thông báo.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Backend: WebSocket Gateway
o	Hệ thống phải implement một WebSocket Gateway (ví dụ: sử dụng Socket.io hoặc
NestJS Gateway) (FR-N1).
o Khi người dùng Admin đăng nhập (load frontend-admin), frontend phải thiết lập một kết nối WebSocket vĩnh viễn (persistent) đến Gateway (FR-N2).
o Gateway phải xác thực (authenticate) kết nối (ví dụ: bằng JWT) và gán người dùng
vào một "phòng" (room) dựa trên userId của họ (ví dụ: room: 'user-123') (FR-N3).
2.	Backend: Notification Emitter (Trình phát Thông báo)
o	Hệ thống phải có một Notificationservice (hoặc EventEmitter) mà các service khác
(ví dụ: TicketsService, BillingService) có thể gọi (FR-N4).
o Ví dụ: Khi TicketsService tạo một ticket khẩn cấp, nó phải gọi this.notificationService.emit(userId, payload) (FR-N5).
o Notificationservice sau đó phải sử dụng Gateway (FR-N1) để gửi (emit) payload thông báo đến "phòng" WebSocket chính xác (ví dụ: room: 'user-123') (FR-N6).
3.	Frontend: Notification Panel (UI)
o	Hệ thống phải hiển thị một biểu tượng chuông (bell icon) với một bộ đếm
(notificationBadge) số lượng thông báo chưa đọc (unread count) (FR-N7).
o	Nhấp vào chuông phải mở notificationPanel (FR-N8).
o notificationPanel phải có các tab lọc (All, Urgent, Jobs, System) như trong wireframe (FR-N9).
o notificationPanel phải hiển thị danh sách các notification-item (FR-N10).
o	Mỗi item phải hiển thị Icon, Title, Message, Time, và các Nút Hành động (Action
Buttons) động (dynamic) (FR-N11).
o Nút "Mark all as read" phải gọi API để cập nhật trạng thái isRead trong CSDL và reset bộ đếm (FR-N12).
4.	Frontend: Real-time Client
o Frontend phải lắng nghe (listen) sự kiện WebSocket (ví dụ: socket.on('newNotification', ...)) (FR-N13).
o Khi nhận được thông báo mới (FR-N13), frontend phải (FR-N14):
■	Hiển thị một thông báo nhanh (toast/popup) nhỏ (tùy chọn).
■	Thêm thông báo mới vào đầu danh sách trong notificationPanel.
■	Tăng (increment) bộ đếm notificationBadge (FR-N7).
o Các nút hành động (FR-N11) phải kích hoạt các hành động cụ thể (ví dụ: onClick trên "Generate Invoice" sẽ mở modal tạo hóa đơn với jobId đã được điền sẵn).
5.	Non-Goals (Ngoài phạm vi)
•	Hệ thống này không gửi thông báo đẩy (Push Notifications) của trình duyệt hoặc di động (native) trong V1. Nó chỉ là thông báo trong ứng dụng (in-app) qua WebSocket.
•	Người dùng không thể tùy chỉnh (customize) loại thông báo họ muốn nhận trong V1.
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) Cần một bảng CSDL (ví dụ: Notifications) để lưu trữ tất cả các thông báo (để người dùng có thể xem lịch sử ngay cả khi họ không online lúc thông báo được gửi).
•	(Backend) Notifications table cần các trường: userId (người nhận), title, message, category ('urgent', 'jobs', 'system'), isRead (boolean), và (quan trọng) actionPayload (JSON, ví dụ: {"action": "OPEN_TICKET", "ticketId": 123}).
•	(Frontend) Cần một Notificationstore (ví dụ: Zustand/Context) để quản lý trạng thái (state) của các thông báo (danh sách notifications, unreadCount).
•	(Frontend) NotificationStore sẽ là nơi xử lý việc kết nối WebSocket và lắng nghe các sự kiện (FR-N13, FR-N14).
7.	Success Metrics (Chỉ số Thành công)
•	Thời gian từ khi sự kiện xảy ra (ví dụ: ticket khẩn cấp được tạo) đến khi Quản lý nhận được
thông báo (bộ đếm tăng) < 3 giây.
•	Giảm 50% thời gian phản hồi cho các ticket "Urgent" (Khẩn cấp).
•	Các hành động nhanh (ví dụ: "Generate Invoice" từ thông báo) được sử dụng cho 30% các công việc. 
PRD: Mô-đun Reports (Báo cáo)
1.	Giới thiệu / Tổng quan
Mô-đun Báo cáo (Reports) cung cấp các công cụ phân tích và trực quan hóa dữ liệu cho cấp quản lý. Nó tổng hợp dữ liệu từ các mô-đun Ticket, Kỹ thuật viên và Khách hàng để hiển thị các Chỉ số Hiệu suất Chính (KPI), xu hướng và các bảng dữ liệu hiệu suất chi tiết.
2.	Mục tiêu
•	Nghiệp vụ: Cung cấp thông tin chi tiết (insights) có thể hành động (actionable) để cải
thiện hiệu suất dịch vụ, tối ưu hóa chi phí và tăng sự hài lòng của khách hàng.
•	Người dùng: Cho phép người quản lý dễ dàng xem, lọc theo ngày và xuất (export) các
báo cáo hiệu suất quan trọng.
•	Kỹ thuật: Xây dựng một tập hợp các API tổng hợp (aggregation) hiệu suất cao và các
component biểu đồ (chart) có thể tái sử dụng.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Quản lý, tôi muố'n xem nhanh 3 KPI quan trọng nhất (Tỷ lệ hoàn thành, Thời gian giải quyết, CSAT) để biết tình hình chung.
•	Là một Quản lý, tôi muố'n xem biểu đồ tròn về Tỷ lệ Ticket theo Trạng thái, để biết công việc đang bị "tắc" ở đâu.
•	Là một Quản lý, tôi muố'n xem biểu đồ cột về Khối lượng Ticket hàng tháng, để xác định xu hướng (tăng/giảm) nhu cầu dịch vụ.
•	Là một Quản lý, tôi muố'n xem biểu đồ phân tích (breakdown) các ticket theo Loại Thiết bị và Mức độ Ưu tiên, để biết thiết bị nào hay hỏng nhất.
•	Là một Quản lý, tôi muố'n xem một bảng (table) xếp hạng Hiệu suất Kỹ thuật viên (Technician Performance) để xác định các nhân viên hàng đầu và những người cần đào tạo thêm.
•	Là một Quản lý, tôi muố'n xem một bảng xếp hạng các Bệnh viện theo Khối lượng Dịch vụ (Service Volume) để xác định các khách hàng quan trọng nhất.
•	Là một Quản lý, tôi muố'n có thể chọn một khoảng ngày (Date Range) (ví dụ: "This Month", "Last Quarter") và thấy tất cả các biểu đồ/bảng trên trang tự động cập nhật.
•	Là một Quản lý, tôi muố'n có thể nhấp vào nút "Export PDF" hoặc "Export Excel" để tải về báo cáo tôi đang xem.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Bộ lọc Chung (Global Filters):
o Hệ thống phải cung cấp một bộ lọc Date Range (Khoảng ngày) (FR-R1).
o	Tất cả 6 component dữ liệu (KPI, Charts, Tables) trên trang phải tự động cập nhật để
phản ánh Date Range đã chọn (FR-R2).
o	Hệ thống phải cung cấp các nút "Export PDF" và "Export Excel". Khi nhấp, hệ thống
phải tạo file export chứa dữ liệu hiện tại đang hiển thị (FR-R3).
2.	Thẻ KPI (Metrics Row):
o	Hệ thống phải hiển thị 3 thẻ KPI: "Completion Rate" (%), "Avg. Resolution Time"
(days), và "Customer Satisfaction" (X/5.0) (FR-R4).
3.	Lưới Biểu đồ (Charts Grid):
o	Hệ	thống	phải	hiển	thị	một	biểu	đồ	tròn (Pie Chart) "Tickets by Status" (FR-R5).
o	Hệ	thống	phải	hiển	thị	một	biểu	đồ	cột (Bar Chart) "Monthly Ticket Volume" (FR-R6).
o	Hệ	thống	phải	hiển	thị	một	biểu	đồ	cột (Bar Chart) "Equipment Type Breakdown"
(FR-R7).
o	Hệ thống phải hiển thị một biểu đồ cột (Bar Chart) "Resolution Time by Priority" (FR-
R8).
4.	Bảng Dữ liệu (Data Tables):
o	Hệ thống phải hiển thị một bảng "Technician Performance" với các cột như trong
wireframe (Name, Tickets Completed, Avg. Time, Success Rate, Rating) (FR-R9).
o	Hệ thống phải hiển thị một bảng "Top Hospitals by Service Volume" với các cột như
trong wireframe (Hospital, Total Tickets, Urgent, Avg. Response, Satisfaction, Revenue) (FR-R10).
5.	Non-Goals (Ngoài phạm vi)
•	Tính năng này sẽ không hỗ trợ việc tạo báo cáo tùy chỉnh (custom reports). Tất cả các báo cáo đều được định nghĩa trước.
•	Tính năng này sẽ không hỗ trợ việc đi sâu (drill-down) khi nhấp vào một phần của biểu đồ trong phiên bản đầu tiên.
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend) Đây là một mô-đun nặng về truy vấn (query-heavy). Các API (ví dụ: GET /reports/summary) phải sử dụng các câu lệnh SQL GROUP BY, AVG, COUNT hiệu suất cao.
•	(Backend) Cân nhắc việc cache (lưu đệm) các kết quả báo cáo (ví dụ: 1 giờ một lần) để tránh truy vấn CSDL liên tục nếu dữ liệu không cần real-time đến từng giây.
•	(Frontend) Sử dụng một thư viện biểu đồ mạnh mẽ (ví dụ: Recharts, Chart.js) để render các biểu đồ.
•	(Frontend) Tạo một ReportsContext (hoặc store) để giữ dateRange. Tất cả các component con (KPI, Charts, Tables) sẽ đọc từ context này và tự động refetch (gọi lại API) khi dateRange thay đổi.
•	(Backend) Logic "Export PDF" và "Export Excel" nên được xử lý ở backend để đảm bảo tính nhất quán của dữ liệu.
7.	Success Metrics (Chỉ số Thành công)
•	Thời gian tải toàn bộ trang Reports (với tất cả 6 component dữ liệu) dưới 5 giây.
•	100% dữ liệu trên các biểu đồ khớp với dữ liệu trong các bảng chi tiết.
•	Quản lý có thể export một báo cáo PDF trong vòng 10 giây. 
PRD: Mô-đun Schedule (Lịch trình)
1.	Giới thiệu / Tổng quan
Mô-đun Lịch trình (Schedule) là trung tâm điều phối của ứng dụng. Nó cho phép Quản lý Dịch vụ và Điều phối viên xem tất cả các công việc đã lên lịch trên một lưới lịch hàng tuần, xem nhanh trạng thái của từng kỹ thuật viên, và lọc toàn bộ chế độ xem theo một kỹ thuật viên cụ thể. Nó cũng là nơi kích hoạt chức năng "Lên lịch Công việc Mới".
2.	Mục tiêu
•	Nghiệp vụ: Tối ưu hóa việc phân công kỹ thuật viên, tránh đặt trùng lịch, và cung cấp
một cái nhìn tổng quan rõ ràng về khối lượng công việc hàng tuần.
•	Người	dùng: Cho phép người	quản	lý nhanh chóng xem (1) tất	cả	công	việc,	hoặc	(2) chỉ
công việc của một kỹ thuật viên cụ thể trên cả lịch và danh sách.
•	Kỹ thuật: Xây dựng một giao diện lịch tương tác, được điều khiển bởi trạng thái (state)
bộ lọc trung tâm.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Điề'u phối viên, tôi muố’n xem lịch hàng tuần mặc định hiển thị công việc của tất cả các kỹ thuật viên, để tôi có cái nhìn tổng quan về khối lượng công việc.
•	Là một Quản lý, tôi muốn chọn một kỹ thuật viên từ bộ lọc "By Technician", và ngay lập tức thấy cả Lịch hàng tuần và Danh sách Trạng thái chỉ cập nhật cho kỹ thuật viên đó.
•	Là một Quản lý, tôi muố’n xem một danh sách các kỹ thuật viên ở bên cạnh, hiển thị trạng thái hiện tại của họ (ví dụ: Rảnh, Bận, Ngoài văn phòng) và công việc hiện tại/tiếp theo.
•	Là một Điề'u phối viên, tôi muố’n nhấp vào nút "Schedule Job" (Lên lịch Công việc) để mở modal chi tiết và tạo một cuộc hẹn mới.
•	Là một Điề'u phối viên, tôi muố’n nhấp vào một sự kiện (công việc) đã có trên lịch để mở modal chi tiết của công việc đó và thực hiện thay đổi (ví dụ: gán lại, đổi lịch).
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Chế độ xem Mặc định (Tất cả Kỹ thuật viên):
o	Khi	tải	trang, Lịch hàng tuần phải hiển thị các sự kiện	(jobs)	của tất cả kỹ thuật viên.
o	Khi	tải	trang, Danh sách Trạng thái Kỹ thuật viên (bên	phải)	phải hiển thị thẻ (card)
của tất cả kỹ thuật viên.
2.	Lưới Lịch hàng tuần (Weekly Schedule Grid):
o Hệ thống phải hiển thị một lưới 7 ngày (Mon-Sun) với các hàng cho các khối thời gian (ví dụ: 08:00 - 12:00, 13:00 - 17:00).
o Các sự kiện công việc (schedule-event) phải được đặt chính xác vào ô ngày/giờ
tương ứng.
o Các sự kiện phải được mã hóa màu sắc dựa trên mức độ ưu tiên/loại (ví dụ: Khẩn cấp, Bảo trì).
o Nhấp vào một sự kiện phải mở Modal Lên lịch (Schedule Job Modal) ở chế độ "Chỉnh sửa" (Edit mode), điền sẵn thông tin của công việc đó.
3.	Danh sách Trạng thái Kỹ thuật viên (Technicians Status List):
o	Hệ thống phải hiển thị một danh sách các thẻ kỹ thuật viên (tech-card).
o	Mỗi thẻ phải hiển thị Tên, Trạng thái (ví dụ: Available, Busy) và công việc đang được
gán (nếu có).
4.	Chức năng Lọc (Theo Lựa chọn B):
o	Hệ	thống phải	cung	cấp một	bộ	lọc	"By Technician" (ví	dụ:	dropdown) và một	bộ	lọc
"This Week" (Date Range).
o Khi người dùng chọn một kỹ thuật viên từ bộ lọc "By Technician":
■	Lưới Lịch hàng tuần (FR2) phải gọi lại API và chỉ render các công việc của
technicianId đã chọn.
■	Danh sách Trạng thái Kỹ thuật viên (FR3) phải gọi lại API (hoặc lọc) và chỉ hiển thị thẻ của technicianId đã chọn.
o Bộ lọc phải có tùy chọn "All Technicians" (Tất cả Kỹ thuật viên) để quay lại Chế độ xem Mặc định (FR1).
5.	Modal Lên lịch Công việc (Schedule Job Modal):
o Nút "Schedule Job" phải mở ra modal scheduleJobModal (đã được định nghĩa trong wireframe) ở chế độ "Tạo mới" (Create mode).
o Modal này phải hoạt động đầy đủ như mô tả trong wireframe (chọn Khách hàng, Thiết bị, Kỹ thuật viên, kiểm tra xung đột lịch, v.v.).
5.	Non-Goals (Ngoài phạm vi)
•	Tính năng này sẽ không hỗ trợ kéo-thả (drag-and-drop) các sự kiện trên lịch trong phiên bản đầu tiên (đây là một tính năng phức tạp, sẽ để sau). Việc thay đổi lịch trình sẽ được thực hiện thông qua việc nhấp vào sự kiện và chỉnh sửa trong modal.
•	Hệ thống sẽ không tự động tính toán thời gian di chuyển (travel time) giữa các địa điểm.
6.	Design Considerations (Cân nhắc Thiết kế)
•	Giao diện phải tuân thủ chặt chẽ wireframe.
•	Cần có một chỉ báo trực quan rõ ràng (ví dụ: "Đang hiển thị lịch trình cho: Nguyen Van A") khi bộ lọc Kỹ thuật viên được áp dụng.
•	Việc kiểm tra xung đột lịch (availability check) trong modal "Schedule Job" là rất quan
trọng.
7.	Technical Considerations (Cân nhắc Kỹ thuật)
• (Frontend) Cần một state (trạng thái) cấp cao (ví dụ: Context, Zustand, Redux) để giữ
selectedDateRange (Khoảng ngày đã chọn) và selectedTechnicianId (ID Kỹ thuật viên đã chọn, có thể là null nếu là "All").
•	(Frontend) Cả hai component WeeklyScheduleGrid và TechnicianStatusList phải "lắng nghe" (subscribe) các thay đổi của các state này.
•	(Frontend) Khi state thay đổi, cả hai component phải kích hoạt gọi API (refetch) với các tham số đã cập nhật.
•	(Backend) Cần một endpoint GET /schedule/jobs chấp nhận các tham số: startDate, endDate, và (tùy chọn) technicianId.
•	(Backend) Cần một endpoint GET /technicians/status chấp nhận (tùy chọn) technicianId.
Nếu không có technicianId, trả về tất cả. Nếu có, chỉ trả về một kỹ thuật viên.
•	(Backend) API để tạo/cập nhật một công việc (từ modal) phải bao gồm logic kiểm tra xung đột (conflict checking) phía máy chủ.
8.	Success Metrics (Chỉ số Thành công)
•	Giảm 100% số lần đặt trùng lịch (double-booking) cho kỹ thuật viên.
•	Thời gian để điều phối viên lọc lịch trình của 1 kỹ thuật viên < 2 giây.
•	Thời gian để lên lịch một công việc mới (mở modal đến khi xác nhận) < 60 giây. 
PRD: Mô-đun Schedule (Lịch trình)
1.	Giới thiệu / Tổng quan
Mô-đun Lịch trình (Schedule) là trung tâm điều phối của ứng dụng. Nó cho phép Quản lý Dịch vụ và Điều phối viên xem tất cả các công việc đã lên lịch trên một lưới lịch hàng tuần, xem nhanh trạng thái của từng kỹ thuật viên, và lọc toàn bộ chế độ xem theo một kỹ thuật viên cụ thể. Nó cũng là nơi kích hoạt chức năng "Lên lịch Công việc Mới".
2.	Mục tiêu
•	Nghiệp vụ: Tối ưu hóa việc phân công kỹ thuật viên, tránh đặt trùng lịch, và cung cấp một cái nhìn tổng quan rõ ràng về khối lượng công việc hàng tuần.
•	Người dùng: Cho phép người quản lý nhanh chóng xem (1) tất cả công việc, hoặc (2) chỉ công việc của một kỹ thuật viên cụ thể trên cả lịch và danh sách.
•	Kỹ thuật: Xây dựng một giao diện lịch tương tác, được điều khiển bởi trạng thái (state) bộ lọc trung
tâm.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Điều phối viên, tôi muốn xem lịch hàng tuần mặc định hiển thị công việc của tất cả các kỹ thuật viên, để tôi có cái nhìn tổng quan về khối lượng công việc.
•	Là một Quản lý, tôi muốn chọn một kỹ thuật viên từ bộ lọc "By Technician", và ngay lập tức thấy cả
Lịch hàng tuần và Danh sách Trạng thái chỉ cập nhật cho kỹ thuật viên đó.
•	Là một Quản lý, tôi muốn xem một danh sách các kỹ thuật viên ở bên cạnh, hiển thị trạng thái hiện
tại của họ (ví dụ: Rảnh, Bận, Ngoài văn phòng) và công việc hiện tại/tiếp theo.
•	Là một Điều phối viên, tôi muốn nhấp vào nút "Schedule Job" (Lên lịch Công việc) để mở modal chi tiết và tạo một cuộc hẹn mới.
•	Là một Điều phối viên, tôi muốn nhấp vào một sự kiện (công việc) đã có trên lịch để mở modal chi tiết của công việc đó và thực hiện thay đổi (ví dụ: gán lại, đổi lịch).
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Chế độ xem Mặc định (Tất cả Kỹ thuật viên):
o	Khi tải	trang,	Lịch hàng tuần phải hiển thị các sự	kiện (jobs)	của tất cả kỹ thuật viên.
o	Khi tải	trang,	Danh sách Trạng thái Kỹ thuật viên	(bên phải)	phải hiển thị thẻ (card) của tất cả
kỹ thuật viên.
2.	Lưới Lịch hàng tuần (Weekly Schedule Grid):
o Hệ thống phải hiển thị một lưới 7 ngày (Mon-Sun) với các hàng cho các khối thời gian (ví dụ: 08:00 - 12:00, 13:00 - 17:00).
o	Các sự kiện công việc (schedule-event) phải được đặt chính xác vào ô ngày/giờ tương ứng.
o	Các sự kiện phải được mã hóa màu sắc dựa trên mức độ ưu tiên/loại (ví dụ: Khẩn cấp, Bảo trì).
o Nhấp vào một sự kiện phải mở Modal Lên lịch (Schedule Job Modal) ở chế độ "Chỉnh sửa" (Edit mode), điền sẵn thông tin của công việc đó. 
3.	Danh sách Trạng thái Kỹ thuật viên (Technicians Status List):
o	Hệ thống phải hiển thị một danh sách các thẻ kỹ thuật viên (tech-card).
o	Mỗi thẻ phải hiển thị Tên, Trạng thái (ví dụ: Available, Busy) và công việc đang được gán (nếu
có).
4.	Chức năng Lọc (Theo Lựa chọn B):
o Hệ thốíng phải cung cấp một bộ lọc "By Technician" (ví dụ: dropdown) và một bộ lọc "This Week" (Date Range).
o Khi người dùng chọn một kỹ thuật viên từ bộ lọc "By Technician":
■	Lưới Lịch hàng tuần (FR2) phải gọi lại API và chỉ render các công việc của technicianld đã
chọn.
■	Danh sách Trạng thái Kỹ thuật viên (FR3) phải gọi lại API (hoặc lọc) và chỉ hiển thị thẻ của technicianId đã chọn.
o	Bộ lọc phải có tùy chọn "All Technicians" (Tất cả Kỹ thuật viên) để quay lại Chế độ xem Mặc
định (FR1). 
5.	Modal Lên lịch Công việc (Schedule Job Modal):
o Nút "Schedule Job" phải mở ra modal scheduleJobModal (đã được định nghĩa trong wireframe) ở chế độ "Tạo mới" (Create mode).
o Modal này phải hoạt động đầy đủ như mô tả trong wireframe (chọn Khách hàng, Thiết bị, Kỹ thuật viên, kiểm tra xung đột lịch, v.v.).
5.	Non-Goals (Ngoài phạm vi)
•	Tính năng này sẽ không hỗ trợ kéo-thả (drag-and-drop) các sự kiện trên lịch trong phiên bản đầu tiên (đây là một tính năng phức tạp, sẽ để sau). Việc thay đổi lịch trình sẽ được thực hiện thông qua việc nhấp vào sự kiện và chỉnh sửa trong modal.
•	Hệ thống sẽ không tự động tính toán thời gian di chuyển (travel time) giữa các địa điểm.
6.	Design Considerations (Cân nhắc Thiết kế)
•	Giao diện phải tuân thủ chặt chẽ wireframe.
•	Cần có một chỉ báo trực quan rõ ràng (ví dụ: "Đang hiển thị lịch trình cho: Nguyen Van A") khi bộ lọc Kỹ thuật viên được áp dụng.
•	Việc kiểm tra xung đột lịch (availability check) trong modal "Schedule Job" là rất quan trọng.
7.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Frontend) Cần một state (trạng thái) cấp cao (ví dụ: Context, Zustand, Redux) để giữ
selectedDateRange (Khoảng ngày đã chọn) và selectedTechnicianId (ID Kỹ thuật viên đã chọn, có thể là null nếu là "All").
•	(Frontend) Cả hai component WeeklyScheduleGrid và TechnicianStatusList phải "lắng nghe" (subscribe) các thay đổi của các state này.
•	(Frontend) Khi state thay đổi, cả hai component phải kích hoạt gọi API (refetch) với các tham số đã cập nhật.
•	(Backend) Cần một endpoint GET /schedule/jobs chấp nhận các tham số: startDate, endDate, và (tùy chọn) technicianId.
•	(Backend) Cần một endpoint GET /technicians/status chấp nhận (tùy chọn) technicianId. Nếu không có technicianId, trả về tất cả. Nếu có, chỉ trả về một kỹ thuật viên.
•	(Backend) API để tạo/cập nhật một công việc (từ modal) phải bao gồm logic kiểm tra xung đột (conflict checking) phía máy chủ.
8.	Success Metrics (Chỉ số Thành công)
•	Giảm 100% số' lần đặt trùng lịch (double-booking) cho kỹ thuật viên.
•	Thời gian để điều phối viên lọc lịch trình của 1 kỹ thuật viên < 2 giây.
•	Thời gian để lên lịch một công việc mới (mở modal đến khi xác nhận) < 60 giây.
PRD: Mô-đun Settings (Cài đặt)
1.	Giới thiệu / Tổng quan
Mô-đun Cài đặt (Settings) là trung tâm quản trị (Admin Center) của ứng dụng, chỉ dành cho người dùng có vai trò (role) "Quản trị viên" (Admin). Nó không xuất hiện trong file wireframe, nhưng dựa trên yêu cầu (1.C), nó sẽ bao gồm hai chức năng cốt lõi:
1.	Quản lý Người dùng (User Management): Cho phép Admin tạo, xem, chỉnh sửa và vô hiệu hóa (deactivate) tài khoản người dùng nội bộ (ví dụ: Kỹ thuật viên, Quản lý khác, Kế toán).
2.	Cài đặt Hệ thống (System Settings): Cho phép Admin cấu hình thông tin chung của công ty (để sử dụng trên hóa đơn) và các cài đặt toàn cục khác.
2.	Mục tiêu
•	Nghiệp vụ: Cung cấp cho Admin khả năng tự quản lý (self-serve) tài khoản người dùng
và cấu hình hệ thống mà không cần can thiệp kỹ thuật.
•	Người dùng (Admin): Cung cấp một giao diện rõ ràng, an toàn để quản lý vòng đời của
nhân viên và các cài đặt của công ty.
•	Kỹ thuật: Xây dựng một hệ thống Quản lý Vai trò và Quyền hạn (Role-Based Access
Control - RBAC) cơ bản và một cơ chế để lưu trữ các cài đặt toàn cục.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Admin, tôi muố'n có một trang "Settings" (Cài đặt) được bảo vệ, chỉ tôi mới có thể truy cập.
•	(User Management) Là một Admin, tôi muố'n xem một bảng (table) gồm tất cả người dùng nội bộ (Kỹ thuật viên, Quản lý, Kế toán) và trạng thái của họ (Active, Inactive).
•	(User Management) Là một Admin, tôi muố'n nhấp vào nút "Invite User" (Mời Người dùng) để gửi email mời một nhân viên mới (ví dụ: một Kỹ thuật viên mới).
•	(User Management) Là một Admin, tôi muố'n có thể gán một "Vai trò" (Role) (ví dụ: 'TECHNICIAN', 'ADMIN', 'ACCOUNTANT') khi mời người dùng.
•	(User Management) Là một Admin, tôi muố'n có thể "Vô hiệu hóa" (Deactivate) tài khoản của một nhân viên đã nghỉ việc.
•	(System Settings)	Là	một Admin, tôi muố'n	có một biểu mẫu (form) "Company Profile"
(Hồ sơ Công ty) nơi	tôi	có thể nhập Tên Công	ty, Địa chỉ, Mã số thuế, và tải lên Logo.
•	(System Settings)	Là	một Admin, tôi muố'n	thông tin tôi nhập trong "Company Profile"
tự động xuất hiện trên tất cả các Hóa đơn (Invoices) được tạo ra.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Bảo mật (Access Control):
o Trang "Settings" (/settings) phải được bảo vệ bởi một Lớp bảo vệ (Guard) AdminGuard. Chỉ người dùng có vai trò (role) ADMIN mới có thể truy cập (FR-S1).
2.	Tab Quản lý Người dùng (User Management):
o Hệ thống phải hiển thị một bảng (table) người dùng nội bộ với các cột: Tên, Email, Vai trò (Role), Trạng thái (Status - Active/Inactive) (FR-S2).
o Hệ thống phải có nút "Invite User" (Mời Người dùng) (FR-S3).
o Nút "Invite User" phải mở một modal yêu cầu Email và Vai trò (Role) (ví dụ: dropdown 'Admin', 'Technician', 'Accountant') (FR-S4).
o Khi submit, backend phải gửi một email mời (ví dụ: dùng SendGrid/Mailgun) với một token (mã) đăng ký duy nhất (FR-S5).
o Hệ thống phải cho phép Admin nhấp vào một người dùng và thay đổi Vai trò (Role) hoặc Trạng thái (Status) của họ (ví dụ: PATCH /users/:id/status) (FR-S6).
3.	Tab Cài đặt Hệ thống (System Settings):
o Hệ thống phải hiển thị một biểu mẫu (form) "Company Profile" (FR-S7).
o Các trường phải bao gồm: companyName, companyAddress, companyTaxId, companyLogoUrl (FR-S8).
o	Admin phải có thể tải lên (upload) một file ảnh companyLogoUrl (FR-S9).
o	Khi submit, các cài đặt này phải được lưu vào CSDL (ví dụ: trong một bảng
SystemSettings) (FR-S10).
o	Mô-đun Billing (cụ thể là InvoiceModal và generateDraftFromJob) phải được sửa đổi
để đọc (fetch) các cài đặt này và hiển thị chúng trên hóa đơn (FR-S11).
5.	Non-Goals (Ngoài phạm vi)
•	Tính năng này không quản lý tài khoản Khách hàng (Customer accounts). (Việc đó được quản lý trong Mô-đun Customers, tab "Contacts").
•	Tính năng này không phải là một hệ thống RBAC (Role-Based Access Control) chi tiết (ví dụ: tùy chỉnh quyền 'read/write' cho từng tính năng). Nó chỉ gán các vai trò (role) cấp cao đã được định nghĩa trước.
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	(Backend)	Cần	một UsersModule để quản lý CRUD cho người	dùng.
•	(Backend)	Cần	một RolesModule hoặc RBACGuard để bảo vệ	các endpoint	(ví dụ:
@Roles('ADMIN')).
•	(Backend) Cần một SettingsModule với một bảng SystemSettings (có thể chỉ có một hàng - singleton) để lưu trữ cài đặt (FR-S10).
•	(Backend) Logic "Mời" (Invite) (FR-S5) yêu cầu tích hợp với một dịch vụ gửi email và quản lý token mời (invite tokens).
•	(Frontend) Cần xây dựng giao diện UI cho trang SettingsPage, có thể bao gồm 2 tab (Users, System).
7.	Success Metrics (Chỉ số Thành công)
•	100% các trang/API nhạy cảm (ví dụ: /settings, /billing) được bảo vệ bởi vai trò (role).
•	Admin có thể mời một Kỹ thuật viên mới và Kỹ thuật viên đó có thể đăng nhập thành công trong vòng 5 phút.
•	Logo công ty được cập nhật trong Cài đặt xuất hiện chính xác trên Hóa đơn PDF. 
PRD: Thiết kế Cơ sở dữ liệu - MedEquip RepairFlow
1.	Giới thiệu
Tài liệu này mô tả kiến trúc cơ sở dữ liệu quan hệ (ví dụ: PostgreSQL) cho toàn bộ hệ thống MedEquip RepairFlow. Thiết kế này dựa trên 15 Epic và các PRD chi tiết đã được lập kế hoạch, đảm bảo mọi mô-đun (từ Tickets, Inventory, Billing đến Mobile Sync) đều được hỗ trợ.
Các bảng được nhóm thành các danh mục logic. Các mối quan hệ quan trọng (Khóa ngoại) được ghi chú rõ ràng.
2.	Sơ đồ Quan hệ Cấp cao (High-Level ERD)
Do không thể vẽ sơ đồ, đây là mô tả logic cốt lõi:
•	Trung tâm (Core): Mọi thứ xoay quanh Customers (Khách hàng). Một Customer sở hữu nhiều Equipment (Thiết bị).
•	BOM (Spare Part List): EquipmentModels (Loại Thiết bị) có mối quan hệ N:N (Nhiều- Nhiều) với Parts (Linh kiện) thông qua bảng equipment_model_parts. Đây chính là "Spare Part List".
•	Quy trình Dịch vụ (Service Flow): Một Equipment sẽ có nhiều Tickets. Mỗi Ticket được gán cho một User (Kỹ thuật viên). Một Ticket sẽ sửu dụng nhiều Parts (thông qua bảng parts_used) và cuối cùng tạo ra một Invoice.
•	Quyề'n (Permissions): Users (Người dùng nội bộ) có các role (vai trò).
CustomerContacts (Người liên hệ của khách hàng) đăng nhập vào Portal và chỉ thấy dữ liệu liên quan đến customerId của họ.
•	Đồng bộ Di động (Mobile Sync): Ứng dụng Di động có một CSDL cục bộ (Local DB), là
một bản sao nhỏ (subset) của các bảng này, với logic đồng bộ "offline-first".
3.	Cấu trúc Bảng Chi tiết (Schema)
3.1.	Nhóm Quản lý Lõi (Core Management Entities)
1. users (Người dùng Nội bộ)
Quản lý nhân viên Admin, Kỹ thuật viên (Technician), Kế toán (Accountant).
Tên Cột (Column Name)	Kiểu Dữ liệu (Data Type)	Ghi chú (Notes)
id	SERIAL PRIMARY KEY	ID duy nhất
full_name	VARCHAR(255)	Tên đầy đủ
email	VARCHAR(255) UNIQUE NOT NULL	Email đăng nhập
password_hash	VARCHAR(255) NOT NULL	Mật khẩu đã hash
role	VARCHAR(50) NOT NULL	Enum: 'ADMIN', 'TECHNICIAN', 'ACCOUNTANT' (PRD- Settings)
status	VARCHAR(50) NOT NULL	Enum: 'ACTIVE', 'INACTIVE' (PRD-Settings)
created_at	TIMESTAMPZ	
updated_at	TIMESTAMPZ	

2.	customers (Khách hàng)
Quản lý các bệnh viện, phòng khám.
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | ID duy nhất |
| name | VARCHAR(255) NOT NULL | Tên bệnh viện (ví dụ: "Bach Mai Hospital") |
| address | TEXT | Địa chỉ |
| tax_id | VARCHAR(100) | Mã số thuế (dùng cho hóa đơn) |
| tier | VARCHAR(50) | Cấp độ (ví dụ: 'PLATINUM', 'GOLD') (PRD-Customers) |
| status | VARCHAR(50) | Enum: 'ACTIVE', 'INACTIVE' |
| created_at | TIMESTAMPZ | |
3.	customer_contacts (Người liên hệ của Khách hàng)
Quản lý tài khoản đăng nhập Portal của khách hàng (PRD-Portal).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | ID duy nhất |
| customer_id | INTEGER | FK -> customers.id (Xác định họ thuộc BV nào) |
| full_name | VARCHAR(255) | Tên (ví dụ: "Dr. Nguyen Minh Duc") |
| email | VARCHAR(255) UNIQUE NOT NULL | Email đăng nhập Portal | 
| password_hash | VARCHAR(255) NOT NULL | Mật khẩu Portal |
| phone | VARCHAR(50) | |
| role | VARCHAR(100) | Vai trò tại BV (ví dụ: "Biomedical Engineer") |
| created_at | TIMESTAMPZ | |
4.	equipment_models (Loại Thiết bị)
(BẢNG MỚI - Thêm vào để hỗ trợ Spare Part List)
Sổ cái chính của các loại thiết bị (ví dụ: "Varian TrueBeam 2.7").
Tên Cột (Column Name)	Kiểu Dữ liệu (Data Type)	Ghi chú (Notes)
id	SERIAL PRIMARY KEY	ID duy nhất
name	VARCHAR(255) NOT NULL	Tên (ví dụ: "Varian TrueBeam")
model_number	VARCHAR(100) UNIQUE	Model (ví dụ: "TrueBeam 2.7")
manufacturer	VARCHAR(100)	Hãng sản xuất (ví dụ: "Varian")
created_at	TIMESTAMPZ	

5. equipment (Thiết bị Cụ thể)
(CẬP NHẬT - Sửa đổi từ Bảng 4 cũ)
Sổ cái (master registry) của các thiết bị cụ thể (ví dụ: "Máy S/N: TB-2019-0234").
Tên Cột (Column Name)	Kiểu Dữ liệu (Data Type)	Ghi chú (Notes)
id	SERIAL PRIMARY KEY	ID duy nhất
customer_id	INTEGER NOT NULL	FK -> customers.id (Thuộc về khách hàng nào)
model_id	INTEGER NOT NULL	(MỚI) FK ->
equipment_models.id
serial_number	VARCHAR(100) UNIQUE	Serial Number (quan trọng)
location	TEXT	Vị trí cụ thể (ví dụ: "Phòng 301, Tầng 3")
install_date	DATE	Ngày cài đặt
status	VARCHAR(50)	Enum: 'ACTIVE', 'INACTIVE', 'MAINTENANCE'
created_at	TIMESTAMPZ	
name	VARCHAR(255)	(ĐÃ XÓA - Chuyển sang equipment_models)
model_number	VARCHAR(100)	(ĐÃ XÓA - Chuyển sang equipment_models)
manufacturer	VARCHAR(100)	(ĐÃ XÓA - Chuyển sang equipment_models)

6.	contracts (Hợp đồng Dịch vụ)
Quản lý các hợp đồng dịch vụ (PRD-Portal / PRD-Customers).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | ID duy nhất |
| customer_id | INTEGER NOT NULL | FK -> customers.id |
| title | VARCHAR(255) | Tiêu đề (ví dụ: "Premium Service Agreement 2024") |
| start_date | DATE | |
| end_date | DATE | |
| status | VARCHAR(50) | Enum: 'ACTIVE', 'EXPIRED' |
| terms | TEXT | Điều khoản (nội dung hợp đồng) |
7.	contract_equipment (Thiết bị trong Hợp đồng)
Bảng Nối (N:N) giữa contracts và equipment.
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| contract_id | INTEGER | FK -> contracts.id |
| equipment_id | INTEGER | FK -> equipment.id |
3.2. Nhóm Quy trình Dịch vụ (Service Workflow Entities)
8.	tickets (Phiếu Dịch vụ)
Bảng trung tâm của toàn bộ quy trình. Lưu trữ Ticket (Yêu cầu) và Job (Công việc). (CẬP NHẬT - Sửa đổi từ Bảng 7 cũ, không thay đổi cấu trúc, chỉ thay đổi số thứ tự) 
Tên Cột (Column Name)	Kiểu Dữ liệu (Data Type)	Ghi chú (Notes)
id	SERIAL PRIMARY KEY	
ticket_ref	VARCHAR(50) UNIQUE	ID tham chiếu (ví dụ: "RT- 2024-1847")
customer_id	INTEGER NOT NULL	FK -> customers.id
equipment_id	INTEGER NOT NULL	FK -> equipment.id
assigned_to_id	INTEGER	FK -> users.id (Kỹ thuật viên được gán)
created_by_id	INTEGER	FK ->
customer_contacts.id (Nếu tạo từ Portal)
status	VARCHAR(50) NOT NULL	Trạng thái (ví dụ: 'NEW', 'DIAGNOSING', 'AWAITING_APPROVAL', 'PARTS_ORDERED', 'REPAIRING', 'TESTING', 'READY_FOR_INVOICING', 'COMPLETED', 'CANCELLED')
priority	VARCHAR(50)	Enum: 'HIGH', 'MEDIUM', 'LOW'
issue_description	TEXT	Mô tả vấn đề (do khách hàng/admin nhập)
resolution_notes	TEXT	Ghi chú xử lý (do kỹ thuật viên nhập)
scheduled_date	TIMESTAMPZ	Ngày lên lịch (PRD- Schedule)
completed_at	TIMESTAMPZ	Ngày hoàn thành
labor_hours	DECIMAL(5, 2)	Tổng số giờ công (do Tech App ghi lại)
quote_amount	DECIMAL(12, 2)	Số tiền báo giá
created_at	TIMESTAMPZ	

9.	job_notes (Ghi chú Công việc)
Lịch sử/Ghi chú của Kỹ thuật viên (PRD-Mobile).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| ticket_id | INTEGER NOT NULL | FK -> tickets.id |
| user_id | INTEGER NOT NULL | FK -> users.id (Ai đã viết) |
| note | TEXT | Nội dung ghi chú |
| created_at | TIMESTAMPZ | |
10.	job_attachments (File đính kèm Công việc)
Lưu ảnh chụp, chữ ký (PRD-Mobile).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| ticket_id | INTEGER NOT NULL | FK -> tickets.id |
| user_id | INTEGER NOT NULL | FK -> users.id (Ai đã tải lên) |
| file_url | VARCHAR(512) NOT NULL | URL (đường dẫn) đến file (ví dụ: S3, GCS) |
| attachment_type | VARCHAR(50) | Enum: 'PHOTO_BEFORE', 'PHOTO_AFTER', 'SIGNATURE' | | created_at | TIMESTAMPZ | |
3.3. Nhóm Kho và Thanh toán (Inventory & Billing Entities)
11.	parts (Linh kiện trong Kho)
Kho tổng (Master Inventory) (PRD-Inventory).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| part_number | VARCHAR(100) UNIQUE NOT NULL | Mã linh kiện (ví dụ: "VAR-GTR-4567") |
| description | TEXT | Mô tả (ví dụ: "Gantry Motor Assembly") |
| stock | INTEGER NOT NULL DEFAULT 0 | Số lượng tồn kho hiện tại |
| min_stock | INTEGER NOT NULL DEFAULT 5 | Tồn kho tối thiểu để cảnh báo |
| cost | DECIMAL(10, 2) | Giá vốn (để tính lợi nhuận, giá trị kho) |
| price | DECIMAL(10, 2) | Giá bán (để tự động điền vào hóa đơn) |
| location | VARCHAR(100) | Vị trí (ví dụ: "Warehouse A-12") |
| status | VARCHAR(50) | Enum: 'IN_STOCK', 'LOW_STOCK', 'ON_ORDER' (PRD-Inventory 1.A) |
12.	equipment_model_parts (Spare Part List / BOM)
(BẢNG MỚI - Thêm vào để hỗ trợ Spare Part List)
Bảng Nối (N:N) giữa equipment_models (Loại) và parts (Linh kiện).
Tên Cột (Column Name)	Kiểu Dữ liệu (Data Type)	Ghi chú (Notes)
id	SERIAL PRIMARY KEY	
model_id	INTEGER	FK ->
equipment_models.id
part_id	INTEGER	FK -> parts.id
		UNIQUE(model_id, part_id)

13.	inventory_logs (Lịch sử Kho)
Theo dõi các thay đổi (Nhập/Xuất) trong kho (PRD-Inventory).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| part_id | INTEGER NOT NULL | FK -> parts.id |
| user_id | INTEGER | FK -> users.id (Ai đã thay đổi, nếu là thủ công) |
| ticket_id | INTEGER | FK -> tickets.id (Nếu bị trừ kho tự động) |
| change | INTEGER NOT NULL | Số lượng thay đổi (ví dụ: -1, +50) |
| reason | VARCHAR(255) | Lý do (ví dụ: "Used on Job", "Manual Stock-in") |
| created_at | TIMESTAMPZ | |
14.	parts_used (Linh kiện Đã dùng)
Bảng Nối (N:N) giữa tickets và parts (PRD-Mobile / PRD-Billing).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| ticket_id | INTEGER NOT NULL | FK -> tickets.id |
| part_id | INTEGER NOT NULL | FK -> parts.id |
| quantity | INTEGER NOT NULL DEFAULT 1 | Số lượng đã dùng |
| cost_at_time | DECIMAL(10, 2) | Ghi lại giá vốn tại thời điểm dùng |
| price_at_time | DECIMAL(10, 2) | Ghi lại giá bán tại thời điểm dùng (cho Hóa đơn) | 15. invoices (Hóa đơn)
Quản lý Hóa đơn (PRD-Billing).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| invoice_ref | VARCHAR(50) UNIQUE | Mã Hóa đơn (ví dụ: "INV-2024-1847") |
| customer_id | INTEGER NOT NULL | FK -> customers.id |
| ticket_id | INTEGER UNIQUE NOT NULL | FK -> tickets.id (Liên kết 1:1 với Ticket) |
| status | VARCHAR(50) NOT NULL | Enum: 'DRAFT', 'PENDING', 'PAID', 'OVERDUE' |
| issue_date | DATE | Ngày phát hành |
| due_date | DATE | Ngày hết hạn |
| sub_total | DECIMAL(12, 2) | Tổng tiền (trước thuế) |
| tax | DECIMAL(12, 2) | Thuế |
| total | DECIMAL(12, 2) | Tổng tiền (sau thuế) |
| paid_at | TIMESTAMPZ | Ngày thanh toán |
| created_at | TIMESTAMPZ | |
16.	invoice_line_items (Các mục trên Hóa đơn)
Các dòng trên hóa đơn (PRD-Billing).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| invoice_id | INTEGER NOT NULL | FK -> invoices.id |
| description | TEXT | Mô tả (ví dụ: "Labor (6.5 hours)" hoặc "Part: Gantry Motor") |
| quantity | DECIMAL(5, 2) | |
| unit_price | DECIMAL(10, 2) | |
| line_total | DECIMAL(12, 2) | |
16.4.	Nhóm Tính năng Ứng dụng (Application Feature Entities)
17.	kb_articles (Bài viết Tri thức)
Lưu trữ các bài viết (PRD-KnowledgeBase).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| author_id | INTEGER | FK -> users.id (Tác giả) |
| title | VARCHAR(255) NOT NULL | Tiêu đề bài viết |
| content | TEXT | Nội dung (Lưu dưới dạng Markdown) |
| category | VARCHAR(100) | Enum: 'TROUBLESHOOTING', 'MANUAL', 'SOP' |
| tags | TEXT[] | Mảng các tag (ví dụ: {'E-4567', 'Gantry'}) |
| created_at | TIMESTAMPZ | |
| updated_at | TIMESTAMPZ | |
18.	notifications (Thông báo)
Lưu trữ thông báo (PRD-Notifications).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | |
| user_id | INTEGER NOT NULL | FK -> users.id (Người nhận) |
| title | VARCHAR(255) | |
| message | TEXT | |
| category | VARCHAR(50) | Enum: 'urgent', 'jobs', 'system' |
| is_read | BOOLEAN DEFAULT false | |
| action_payload | JSONB | (ví dụ: {"action": "OPEN_TICKET", "ticketId": 123}) |
| created_at | TIMESTAMPZ | |
19.	system_settings (Cài đặt Hệ thống)
Bảng Singleton (chỉ 1 hàng) (PRD-Settings).
(...Không thay đổi...)
| Tên Cột (Column Name) | Kiểu Dữ liệu (Data Type) | Ghi chú (Notes) |
| :--- | :--- | :--- |
| id | INTEGER PRIMARY KEY DEFAULT 1 | Chỉ có 1 hàng với ID = 1 |
| company_name | VARCHAR(255) | Tên công ty (dùng cho hóa đơn) |
| company_address | TEXT | Địa chỉ công ty |
| company_tax_id | VARCHAR(100) | Mã số thuế |
| company_logo_url | VARCHAR(512) | URL của Logo |
4.	CSDL Cục bộ (Mobile Local DB Schema)
CSDL Cục bộ (ví dụ: WatermelonDB/Realm) là một bản sao nhỏ của CSDL chính, được thiết kế cho Epic 8.0 (Mobile App) và Epic 15.0 (Equipment CRUD).
Các bảng chính bao gồm:
•	jobs (Công việc):
o	Tải về (Pull) từ tickets (chỉ những ticket được gán cho Kỹ thuật viên này).
o Các trường Kỹ thuật viên có thể sửa (offline): status, resolution_notes, labor_hours.
o	Cần trường _status (ví dụ: 'synced', 'updated').
•	job_notes:
o Chỉ cho phép Create (Tạo) offline.
o	Cần trường _status: 'created'.
•	job_attachments:
o	Chỉ cho phép Create offline.
o Lưu local_file_uri (đường dẫn file cục bộ).
o Cần trường _status: 'pending_upload'.
•	parts_used:
o	Chỉ cho phép Create offline.
o Liên kết job_id (cục bộ) và part_id (tải về từ parts_master).
o Cần trường _status: 'created'.
•	equipment (Mới - từ Epic 15.0):
o Cho phép Create offline.
o Cần trường customer_id (lấy từ job.customerId).
o Cần trường model_id (MỚI).
o Cần trường _status: 'created'.
•	parts_master (Đọc):
o	Bản sao (chỉ đọc) của bảng parts (Kho tổng), được tải về (pull) để Kỹ thuật viên có
thể chọn linh kiện khi offline.
•	equipment_models_master (Đọc - MỚI):
o	Bản sao (chỉ đọc) của bảng equipment_models (Loại Thiết bị), được tải về (pull).
•	model_parts_master (Đọc - MỚI):
o	Bản sao (chỉ đọc) của bảng equipment_model_parts (Spare Part List), được tải về
(pull).
o	Lợi ích: Giúp Ứng dụng Di động (offline) có thể lọc danh sách linh kiện (Spare Part
List) (như đã thảo luận). 
PRD: Ứng dụng Di động (Tech App)
1.	Giới thiệu / Tổng quan
Ứng dụng Di động (Tech App) là công cụ làm việc chính của Kỹ thuật viên (Technician) tại hiện trường. Nó được thiết kế để cung cấp tất cả thông tin họ cần để thực hiện một công việc, ngay cả khi không có kết nối mạng. Ứng dụng cho phép xem lịch làm việc, chi tiết công việc, ghi lại ghi chú, chụp ảnh, sử dụng phụ tùng và lấy chữ ký của khách hàng.
2.	Mục tiêu
•	Nghiệp vụ (Quan trọng nhất): Đảm bảo kỹ thuật viên có thể hoàn thành 100% công việc của họ tại hiện trường (bao gồm cả việc hoàn thành ticket) mà không cần kết nối Internet.
•	Người dùng: Cung cấp một giao diện nhanh, đáng tin cậy, và dễ sử dụng, giúp giảm
thiểu thời gian nhập liệu và tối đa hóa thời gian sửa chữa.
•	Kỹ thuật: Xây dựng một ứng dụng "Offline-First" (Ưu tiên Offline) mạnh mẽ, với logic
đồng bộ hóa (sync) dữ liệu tự động và minh bạch.
3.	User Stories (Câu chuyện Người dùng)
•	Là một Kỹ thuật viên, tôi muố'n mở ứng dụng vào buổi sáng (khi có Wi-Fi) và thấy tất cả các công việc trong ngày/tuần của tôi được tự động tải về điện thoại.
•	Là một Kỹ thuật viên, tôi muố'n đến một bệnh viện (có thể không có sóng ở tầng hầm), mở ứng dụng và xem được toàn bộ chi tiết công việc, bao gồm lịch sử thiết bị và các phụ tùng được yêu cầu.
•	Là một Kỹ thuật viên (khi đang offline), tôi muố'n có thể cập nhật trạng thái công việc, ghi lại ghi chú, chụp ảnh (bằng camera của điện thoại), và sử dụng phụ tùng từ kho di động của tôi.
•	Là một Kỹ thuật viên (khi đang offline), tôi muố'n hoàn thành công việc, tạo một báo cáo dịch vụ, và lấy chữ ký xác nhận của khách hàng ngay trên màn hình điện thoại.
•	Là một Kỹ thuật viên, tôi muố'n khi tôi quay lại xe (có 4G) hoặc về văn phòng (có Wi-Fi), ứng dụng tự động phát hiện kết nối mạng và tự động tải (sync) tất cả các cập nhật, ảnh, và chữ ký của tôi lên máy chủ.
4.	Yêu cầu Chức năng (Functional Requirements)
1.	Kiến trúc Cốt lõi: Offline-First (Theo Lựa chọn B)
o	Ứng dụng phải sử dụng một cơ sở dữ liệu cục bộ (Local Database, ví dụ: SQLite,
WatermelonDB, Realm) (FR-M1).
o	Tất	cả các thao tác đọc	(Read) (ví dụ: xem chi tiết	công	việc) phải	được	thực	hiện	từ
Cơ sở dữ liệu cục bộ, không phải gọi API trực tiếp (FR-M2).
o Tất cả các thao tác ghi (Write) (ví dụ: cập nhật ghi chú, hoàn thành công việc, chụp ảnh) phải được ghi vào Cơ sở dữ liệu cục bộ trước tiên (FR-M3).
2.	Logic Đồng bộ hóa (Sync Logic):
o	Ứng dụng phải có một Dịch vụ Đồng bộ (Sync Service) chạy ngầm (background)
(FR-M4).
o	Đồng bộ Kéo (Pull): Khi có mạng (lúc khởi động ứng dụng hoặc định kỳ), ứng dụng
phải gọi một API (ví dụ: GET /sync/pull?lastSync=...) để tải về các công việc mới/cập nhật và lưu chúng vào CSDL cục bộ (FR-M5).
o	Đồng bộ Đẩ’y (Push): Khi có mạng, Dịch vụ Đồng bộ phải tự động phát hiện các
thay đổi cục bộ (local changes) và đẩy (push) chúng lên máy chủ (ví dụ: POST /sync/push) (FR-M6).
o Xử lý Xung đột (Conflict): Trong trường hợp có xung đột (ví dụ: Quản lý và Kỹ thuật viên cùng sửa 1 công việc), quy tắc "Người dùng cuối (Kỹ thuật viên) luôn thắng" (Last Write Wins from device) sẽ được áp dụng (FR-M7).
3.	Giao diện Người dùng (UI - Dựa trên Wireframe):
o Màn hình chính (Home): Hiển thị chào mừng, trạng thái (On Duty), các hành động nhanh (Photo, Check-in, Parts, Call), Thống kê trong ngày, và danh sách "Current Job" (Công việc hiện tại) và "Next Jobs" (Công việc tiếp theo) (FR-M8).
o Modal Chi tiết Công việc (Job Detail):
■	Hiển thị đầy đủ thông tin (FR-M9).
■	Cho phép Chụp ảnh (sử dụng camera thiết bị và lưu file cục bộ) (FR-M10).
■	Cho phép nhập Ghi chú (Work Notes) (FR-M11).
■	Cho phép chọn/quét Phụ tùng đã sử dụng (Parts Used) (FR-M12).
■	Hiển thị Checklist Hoàn thành (Completion Checklist) (FR-M13).
■	Cung cấp một ô (pad) để lấy Chữ ký Khách hàng (lưu dưới dạng ảnh Base64 hoặc PNG cục bộ) (FR-M14).
o Nút Hoàn thành (Complete Job): Nút này phải hoạt động ngay cả khi offline. Nó sẽ đánh dấu công việc là "completed_locally" (hoàn thành cục bộ) và đưa vào hàng đợi (queue) đồng bộ (FR-M15).
5.	Non-Goals (Ngoài phạm vi)
•	Ứng dụng di động này không dành cho Quản lý. Nó không có Dashboard, Reports, hay
khả năng tạo Hóa đơn (Billing).
•	Ứng dụng di động không dùng để tạo Ticket mới (mặc dù có thể tạo Ticket "follow-up" -
công việc tiếp theo).
•	Ứng dụng không quản lý toàn bộ kho (full inventory), chỉ quản lý kho cá nhân (van stock)
của kỹ thuật viên.
6.	Technical Considerations (Cân nhắc Kỹ thuật)
•	Công nghệ: Cần một framework cross-platform hỗ trợ CSDL cục bộ mạnh mẽ (ví dụ:
React Native + WatermelonDB/Realm, hoặc Capacitor + SQLite).
•	CSDL Cục bộ: Cần thiết kế schema (cấu trúc) cho CSDL cục bộ, bao gồm các bảng Jobs, JobNotes, JobPhotos, JobSignatures, PartsUsed, v.v.
•	Quản lý Ảnh: Ảnh chụp offline phải được lưu vào hệ thống file của thiết bị, và CSDL cục bộ chỉ lưu đường dẫn file (file URI). Dịch vụ Đồng bộ sẽ tải file này lên (ví dụ: S3, Google Cloud Storage) và sau đó cập nhật API với URL đã lưu trữ.
•	Hàng đợi (Queue): Logic đồng bộ đẩy (Push) phải là một hàng đợi (queue) đáng tin cậy. Nếu một yêu cầu (request) thất bại (ví dụ: mất mạng giữa chừng), nó phải thử lại (retry) sau đó.
•	Backend API: Backend phải được sửa đổi để hỗ trợ các endpoint đồng bộ (pull/push) và xử lý một loạt (batch) các thay đổi, thay vì chỉ các yêu cầu CRUD đơn lẻ.
7.	Success Metrics (Chỉ số Thành công)
•	100% các thao tác (Xem, Cập nhật, Hoàn thành) hoạt động trơn tru khi ở chế độ máy bay
(Airplane Mode).
•	Thời gian đồng bộ (sync) trung bình (sau khi có mạng) dưới 10 giây.
•	Không có (zero) trường hợp mất dữ liệu (data loss) do lỗi đồng bộ. 
Relevant Files
•	packages/frontend-portal/src/main.tsx - (Mới) Điểm khởi đầu (entry point) cho ứng dụng Portal frontend riêng biệt.
•	packages/frontend-portal/src/pages/PortalLoginPage.tsx - (Mới) Trang đăng nhập cho Khách hàng.
•	packages/frontend-portal/src/pages/PortalAppLayout.tsx - (Mới) Bố cục (layout) chính sau khi đăng nhập (chứa header, sidebar/tabs).
•	packages/frontend-portal/src/pages/MyRequestsPage.tsx - (Mới) Component trang cho tab "My Requests".
•	packages/frontend-portal/src/pages/MyEquipmentPage.tsx - (Mới) Component trang cho tab "My Equipment".
•	packages/frontend-portal/src/pages/MyContractsPage.tsx - (Mới) Component trang cho tab "Service Contracts".
•	packages/frontend-portal/src/components/PortalTicketCard.tsx - (Mới) Component thẻ ticket (dựa trên portal-ticket-card).
•	packages/frontend-portal/src/components/PortalEquipmentCard.tsx - (Mới) Component thẻ thiết bị (dựa trên portal-equipment-card).
•	packages/frontend-admin/src/components/modals/NewTicketModal.tsx - (Tái sử dụng) Cần được sửa đổi để hỗ trợ mode="portal".
•	packages/backend/src/modules/portal/portal.controller.ts - (Mới) API controller cho GET /portal/tickets, GET /portal/equipment, v.v.
•	packages/backend/src/modules/portal/portal.service.ts - (Mới) Service chứa logic nghiệp vụ cho Portal.
•	packages/backend/src/modules/auth/guards/customer-jwt.guard.ts - (Mới) Lớp bảo vệ (Guard) xác thực cho các endpoint /portal/*.
•	packages/backend/src/modules/auth/strategies/customer-jwt.strategy.ts - (Mới) Chiến lược (Strategy) Passport.js cho JWT của Khách hàng.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Bảo mật (Task 1.0 và 2.0) là ưu tiên hàng đầu. Dữ liệu phải được lọc theo customerId ở
cấp độ API.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/customer-portal)
•	[ ] 1.0 (Backend) Thiết lập Xác thực (Auth) cho Portal
o	[	]	1.1	(Backend)	Tạo CustomerJwtStrategy và CustomerJwtGuard (PRD 4.1, 4.3).
o	[	]	1.2	(Backend)	Cập nhật AuthModule để cung cấp endpoint POST
/auth/portal/login sử dụng chiến lược (strategy) riêng cho Khách hàng.
o	[	]	1.3	(Backend)	Tạo portal.module.ts, portal.controller.ts, portal.service.ts.
o	[	]	1.4	(Backend)	Áp dụng CustomerJwtGuard cho toàn bộ PortalController
(@UseGuards(CustomerJwtGuard)).
•	[ ] 2.0 (Backend) Tạo API Endpoints cho Portal (Đã được Lọc)
o	[ ] 2.1 (Backend) Trong portal.service.ts, tạo hàm getMyTickets(@ReqUser() user).
o	[ ] 2.2 (Backend) Hàm getMyTickets phải gọi this.ticketsService.findAll({ customerId:
user.customerId }) (PRD 4.4).
o [ ] 2.3 (Backend) Trong portal.controller.ts, tạo endpoint GET /portal/tickets gọi hàm getMyTickets.
o [ ] 2.4 (Backend) Tương tự, tạo hàm getMyEquipment(user) (gọi
this.equipmentService.findAll({ customerId: ... })) và endpoint GET /portal/equipment.
o [ ] 2.5 (Backend) Tương tự, tạo hàm getMyContracts(user) và endpoint GET /portal/contracts.
o [ ] 2.6 (Backend) Tương tự, tạo hàm getMyKpis(user) (đếm ticket theo trạng thái, v.v.) và endpoint GET /portal/kpis.
o [ ] 2.7 (Backend) Tạo hàm createMyTicket(user, createTicketDto) và endpoint POST /portal/tickets.
o [ ] 2.8 (Backend) Hàm createMyTicket phải tự động chèn (inject) user.customerId vào createTicketDto trước khi gọi this.ticketsService.create() (PRD 4.8).
•	[ ] 3.0 (Frontend) Khởi tạo Ứng dụng Portal
o	[ ] 3.1 (Frontend) Tạo thư mục packages/frontend-portal mới với cấu hình Vite/React.
o	[ ] 3.2 (Frontend) Tạo PortalLoginPage.tsx với form đăng nhập gọi POST
/auth/portal/login (Task 1.2).
o [ ] 3.3 (Frontend) Thiết lập AuthProvider/Store (ví dụ: Zustand) để lưu trữ JWT của Khách hàng.
o [ ] 3.4 (Frontend) Thiết lập router (ví dụ: React Router) với các trang được bảo vệ (protected routes) yêu cầu đăng nhập.
o [ ] 3.5 (Frontend) Tạo PortalAppLayout.tsx (dựa trên portal-view) với các Tab (My Requests, My Equipment, Contracts) (PRD 4.0).
•	[ ] 4.0 (Frontend) Xây dựng các Tab của Portal
o [ ] 4.1 (Frontend) Tạo MyRequestsPage.tsx. Trang này gọi API GET /portal/kpis (Task
2.6)	và GET /portal/tickets (Task 2.3).
o	[ ] 4.2 (Frontend) Render các thẻ KPI và danh sách PortalTicketCard (PRD 4.9, 4.10).
o	[ ] 4.3 (Frontend) Tạo MyEquipmentPage.tsx. Trang này gọi API GET
/portal/equipment (Task 2.4).
o	[ ] 4.4 (Frontend) Render lưới các PortalEquipmentCard (PRD 4.12).
o	[ ] 4.5 (Frontend) Tạo MyContractsPage.tsx. Trang này gọi API GET /porta l/contracts
(Task 2.5).
o [ ] 4.6 (Frontend) Render chi tiết hợp đồng (PRD 4.14).
•	[ ] 5.0 (Frontend) Tích hợp Chức năng "Request Service"
o [ ] 5.1 (Frontend) Sửa đổi NewTicketModal.tsx (từ frontend-admin) để chấp nhận prop mode: 'admin' | 'portal'.
o [ ] 5.2 (Frontend) Khi mode="portal", Modal phải ẩn (hide) trường chọn Customer/Hospital (PRD 4.6).
o [ ] 5.3 (Frontend) Khi mode="portal", API gọi đến GET /equipment để điền vào danh sách thiết bị phải được thay thế bằng GET /portal/equipment (để chỉ lấy thiết bị của khách hàng) (PRD 4.7).
o [ ] 5.4 (Frontend) Khi submit, Modal phải gọi POST /portal/tickets (Task 2.7) thay vì POST /tickets.
o [ ] 5.5 (Frontend) Kết nối nút "Request Service" trong PortalAppLayout.tsx để mở Modal này ở mode="portal".
•	[ ] 6.0 (Testing) Kiểm thử Bảo mật và Chức năng
o [ ] 6.1 (Test) Viết unit test cho portal.service.ts (Backend) để đảm bảo customerId luôn được sử dụng trong các truy vấn (query).
o	[ ] 6.2 (Test) Viết E2E test (Cypress) cho PortalAppLayout.tsx.
o	[ ] 6.3 (Test) Test case E2E: Đăng nhập với tư cách Customer_A. Mở tab "My
Requests". Xác minh chỉ thấy các ticket của Customer_A.
o [ ] 6.4 (Test) Test case E2E: Đăng nhập với tư cách Customer_B. Mở tab "My Requests". Xác minh chỉ thấy các ticket của Customer_B và không thấy ticket của Customer_A.
o [ ] 6.5 (Test) Test case E2E: (Backend) Cố gắng gọi GET /portal/tickets bằng token của Customer_B nhưng thay đổi customerId trong payload (nếu có thể). Xác minh API trả về lỗi 403 (Forbidden) hoặc chỉ trả về dữ liệu của Customer_B.
o [ ] 6.6 (Test) Test case E2E: (Customer A) Mở modal "Request Service". Xác minh trường "Hospital" bị ẩn. Xác minh danh sách "Equipment" chỉ hiển thị thiết bị của Customer A. 
Relevant Files
•	tasks/prd-medequip-repairflow-system.md - PRD tổng quan của hệ thống.
•	tasks/database-design.md - Thiết kế CSDL của hệ thống.
Notes
•	Đây là danh sách các "Epic" (Mô-đun) cấp cao cho toàn bộ dự án.
•	Mỗi Epic đại diện cho một tính năng lớn cần được lập kế hoạch (viết PRD và Task) riêng
biệt.
•	Khi một Epic được lập kế hoạch chi tiết (ví dụ: prd-dashboard.md và tasks- dashboard.md được tạo), chúng ta sẽ đánh dấu Epic đó là "Đã lập kế hoạch".
Instructions for Completing Tasks
IMPORTANT: Khi bạn yêu cầu tôi lập kế hoạch cho một Epic, tôi sẽ thực hiện 2 Task (ví dụ: 3.1 và 3.2). Sau khi hoàn thành, tôi sẽ đánh dấu chúng là [x] tại đây.
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho dự án này (ví dụ: git checkout -b feature/medequip-repairflow-v1)
•	[x] 1.0 (Phase 1) Cài đặt Dự án (Project Setup)
o [x] 1.1 (Task 1.1) Thiết lập Monorepo (ví dụ: Nx, Turborepo)
o [x] 1.2 (Task 1.2) Cài đặt backend (NestJS) và frontend-admin (React/Vite)
•	[x] 2.0 (Phase 1) Thiết kế CSDL và Xác thực (Auth)
o [x] 2.1 (Task 2.1) Thiết kế CSDL chi tiết (đã tạo database-design.md)
o	[x] 2.2 (Task 2.2) Implement CSDL (Migration scripts)
o	[x] 2.3 (Task 2.3) Implement logic Xác thực (Auth) (JWT, Guards, Login/Register)
•	[x] 3.0 (Phase 2) Hoàn thiện Mô-đun Dashboard
o [x] 3.1 Viết PRD chi tiết cho Dashboard (đã tạo prd-dashboard.md)
o [x] 3.2 Tạo danh sách task chi tiết cho Dashboard (đã tạo tasks-dashboard.md)
•	[x] 4.0 (Phase 2) Hoàn thiện Mô-đun Inventory
o [x] 4.1 Viết PRD chi tiết cho Inventory (đã tạo prd-inventory.md)
o [x] 4.2 Tạo danh sách task chi tiết cho Inventory (đã tạo tasks-inventory.md)
•	[x] 5.0 (Phase 2) Hoàn thiện Mô-đun Schedule
o [x] 5.1 Viết PRD chi tiết cho Schedule (đã tạo prd-schedule.md)
o [x] 5.2 Tạo danh sách task chi tiết cho Schedule (đã tạo tasks-schedule.md)
•	[x] 6.0 (Phase 2) Hoàn thiện Mô-đun Reports
o [x] 6.1 Viết PRD chi tiết cho Reports (đã tạo prd-reports.md)
o [x] 6.2 Tạo danh sách task chi tiết cho Reports (đã tạo tasks-reports.md)
•	[x] 7.0 (Phase 2) Hoàn thiện Mô-đun History
o [x] 7.1 Viết PRD chi tiết cho History (đã tạo prd-history.md)
o [x] 7.2 Tạo danh sách task chi tiết cho History (đã tạo tasks-history.md)
•	[x] 8.0 (Phase 2) Hoàn thiện Ứng dụng Di động (Tech App)
o [x] 8.1 Viết PRD chi tiết cho Tech App (đã tạo prd-mobile-app.md)
o [x] 8.2 Tạo danh sách task chi tiết cho Tech App (đã tạo tasks-mobile-app.md)
•	[x] 9.0 (Phase 2) Hoàn thiện Cổng thông tin Khách hàng (Portal)
o [x] 9.1 Viết PRD chi tiết cho Customer Portal (đã tạo prd-customer-portal.md)
o [x] 9.2 Tạo danh sách task chi tiết cho Customer Portal (đã tạo tasks-customer- portal.md)
•	[x] 10.0 (Phase 2) Hoàn thiện Mô-đun Billing (Thanh toán)
o	[x] 10.1 Viết PRD chi tiết cho Billing (đã tạo prd-billing.md)
o	[x] 10.2 Tạo danh sách task chi tiết cho Billing (đã tạo tasks-billing.md)
•	[x] 11.0 (Phase 2) Hoàn thiện Mô-đun Customers (Khách hàng)
o [x] 11.1 Viết PRD chi tiết cho Customers (đã tạo prd-customers.md)
o [x] 11.2 Tạo danh sách task chi tiết cho Customers (đã tạo tasks-customers.md)
•	[x] 12.0 (Phase 2) Hoàn thiện Mô-đun Knowledge Base (Tri thức)
o [x] 12.1 Viết PRD chi tiết cho Knowledge Base (đã tạo prd-knowledge-base.md)
o [x] 12.2 Tạo danh sách task chi tiết cho Knowledge Base (đã tạo tasks-knowledge- base.md)
•	[x] 13.0 (Phase 2) Hoàn thiện Mô-đun Notifications (Thông báo)
o [x] 13.1 Viết PRD chi tiết cho Notifications (đã tạo prd-notifications.md)
o [x] 13.2 Tạo danh sách task chi tiết cho Notifications (đã tạo tasks-notifications.md)
•	[x] 14.0 (Phase 2) Hoàn thiện Mô-đun Settings (Cài đặt)
o	[x]	14.1 Viết	PRD chi tiết cho Settings (đã tạo prd-settings.md)
o	[x]	14.2 Tạo	danh sách task chi tiết cho Settings (đã tạo tasks-settings.md)
•	[x] 15.0 (Phase 2) Hoàn thiện Mô-đun Equipment (Quản lý CRUD)
o	[x]	15.1 Viết	PRD chi tiết cho Equipment (đã tạo prd-equipment.md)
o	[x]	15.2 Tạo	danh sách task chi tiết cho Equipment (đã tạo tasks-equipment.md)
•	[ ] 16.0 (Phase 2) Hoàn thiện Mô-đun Data Import (Nhập Dữ liệu)
o	[ ] 16.1 Viết PRD chi tiết cho Data Import
o	[ ] 16.2 Tạo danh sách task chi tiết cho Data Import 
Relevant Files
•	packages/frontend-admin/src/pages/BillingPage.tsx - Component trang chính cho mô- đun Billing.
•	packages/frontend-admin/src/components/billing/BillingKpiGrid.tsx - Component cho 4 thẻ KPI tài chính.
•	packages/frontend-admin/src/components/billing/InvoicesTable.tsx - Component bảng (table) hiển thị danh sách hóa đơn.
•	packages/frontend-admin/src/components/billing/InvoiceFilterBar.tsx - Component chứa các nút lọc (Paid, Pending, Overdue, Draft).
•	packages/frontend-admin/src/components/billing/SelectJobTolnvoiceModal.tsx - (Mới) Modal hiển thị danh sách công việc "Ready for Invoicing" (PRD 4.3).
•	packages/frontend-admin/src/components/billing/InvoiceModal.tsx - (Tái sử dụng/Sửa đổi) Modal chi tiết hóa đơn (từ wireframe), hỗ trợ 2 chế độ (Draft và View) (PRD 4.4).
•	packages/backend/src/modules/billing/billing.controller.ts - (Mới) API controller cho KPI (GET /billing/summary) và Invoices (/invoices).
•	packages/backend/src/modules/billing/billing.service.ts - (Mới) Service cho KPI.
•	packages/backend/src/modules/billing/invoices.controller.ts - (Mới) API controller cho CRUD Hóa đơn.
•	packages/backend/src/modules/billing/invoices.service.ts - (Mới) Service chứa logic nghiệp vụ cho Invoices.
•	packages/backend/src/modules/jobs/jobs.service.ts - (Tái sử dụng/Sửa đổi) Service cho Ticket/Job, cần API GET /jobs?status=... (PRD 4.3) và logic cập nhật trạng thái (PRD 4.3).
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Quy trình (Flow) (Task 1.0 và 4.0) là phần quan trọng nhất: Chọn Công việc -> Tạo Nháp - > Chỉnh sửa Nháp -> Gửi.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-billing)
•	[ ] 1.0 (Backend) Thiết lập Quy trình (Flow) Tạo Hóa đơn
o [ ] 1.1 (Backend) Sửa đổi JobsService (hoặc TicketsService) để khi một công việc
được hoàn thành (ví dụ: markAsTestingPassed), trạng thái được set thành READY_FOR_INVOICING (PRD 4.3).
o [ ] 1.2 (Backend) Trong JobsController, tạo endpoint GET
/jobs?status=READY_FOR_INVOICING (PRD 4.3).
o	[ ] 1.3 (Backend) Tạo billing.module.ts, invoices.controller.ts, invoices.service.ts.
o	[ ] 1.4 (Backend) Trong invoices.service.ts, tạo hàm generateDraftFromJob(jobId).
o [ ] 1.5 (Backend) Hàm (Task 1.4) phải đọc jobId, kéo laborHours, partsUsed (và
part.cost), tính tổng, và tạo một bản ghi Invoice mới với trạng thái DRAFT (PRD 4.3).
o [ ] 1.6 (Backend) Trong invoices.controller.ts, tạo endpoint POST /invoices/generate- draft/:jobId gọi hàm (Task 1.4).
•	[ ] 2.0 (Backend) Tạo API Endpoints cho Billing
o	[ ] 2.1 (Backend) Tạo billing.controller.ts và billing.service.ts cho KPI.
o	[ ] 2.2 (Backend) Tạo endpoint GET /billing/summary (chấp nhận dateRange) để tính
4 KPI (Revenue, Pending, Overdue, Paid) (PRD 4.1).
o [ ] 2.3 (Backend) Trong invoices.controller.ts, tạo endpoint GET /invoices hỗ trợ lọc theo status (Paid, Pending, Overdue, Draft) và dateRange (PRD 4.2).
o [ ] 2.4 (Backend) Tạo endpoint GET /invoices/:id để lấy chi tiết một hóa đơn (dùng cho modal).
o [ ] 2.5 (Backend) Tạo endpoint PATCH /invoices/:id (để cập nhật Nháp, Gửi, và Ghi nhận Thanh toán).
o [ ] 2.6 (Backend) Logic PATCH (Task 2.5) phải xử lý các thay đổi trạng thái:
■ status: 'PENDING' (Gửi): Gửi email cho khách hàng (PRD 4.4).
■ status: 'PAID' (Thanh toán): Ghi lại ngày thanh toán (PRD 4.4).
•	[ ] 3.0 (Frontend) Xây dựng Trang Billing (UI Tĩnh)
o	[	]	3.1	(Frontend)	Tạo	BillingPage.tsx.
o	[	]	3.2	(Frontend)	Tạo	BillingKpiGrid.tsx, gọi API	GET /billing/summary (Task 2.2).
o	[	]	3.3	(Frontend)	Tạo	InvoiceFilterBar.tsx, quản	lý trạng thái filterStatus	(PRD 4.2).
o	[	]	3.4	(Frontend)	Tạo	InvoicesTable.tsx, gọi API	GET /invoices và truyền	filterStatus
(PRD 4.2).
o [ ] 3.5 (Frontend) Thêm onClick vào hàng của bảng (table row) để gọi handleOpenViewModal(invoice.id) (PRD 4.2).
o [ ] 3.6 (Frontend) Thêm nút "New Invoice" (PRD 4.3).
•	[ ] 4.0 (Frontend) Tích hợp Quy trình (Flow) Tạo Hóa đơn
o [ ] 4.1 (Frontend) Tạo SelectJobToInvoiceModal.tsx.
o	[ ] 4.2 (Frontend) Nút "New Invoice" (Task 3.6) mở modal SelectJobToInvoiceModal.
o	[ ] 4.3 (Frontend) Modal (Task 4.1) gọi API GET /jobs?status=READY_FOR_INVOICING
(Task 1.2) và hiển thị danh sách.
o [ ] 4.4 (Frontend) Khi người dùng chọn một công việc, gọi API POST /invoices/generate-draft/:jobId (Task 1.6).
o [ ] 4.5 (Frontend) Tạo (hoặc sửa đổi) InvoiceModal.tsx để hỗ trợ 2 chế độ: mode:
'draft' và mode: 'view' (PRD 4.4).
o [ ] 4.6 (Frontend) Sau khi Task 4.4 thành công, đóng SelectJobToInvoiceModal và mở InvoiceModal ở mode: 'draft' với invoiceId mới nhận được (PRD 4.3).
•	[ ] 5.0 (Frontend) Tích hợp Modal Chi tiết Hóa đơn
o [ ] 5.1 (Frontend) Hàm handleOpenViewModal (Task 3.5) mở InvoiceModal ở mode: 'view' với invoice.id.
o [ ] 5.2 (Frontend) Trong InvoiceModal (chế độ 'draft'), nút "Send Invoice" gọi PATCH /invoices/:id với status: 'PENDING' (Task 2.6).
o [ ] 5.3 (Frontend) Trong InvoiceModal (chế độ 'view'), nút "Record Payment" gọi PATCH /invoices/:id với status: 'PAID' (Task 2.6).
o [ ] 5.4 (Frontend) Sau khi (Task 5.2) hoặc (Task 5.3) thành công, đóng modal và refetch (làm mới) cả GET /invoices và GET /billing/summary.
•	[ ] 6.0 (Testing) Kiểm thử Tích hợp
o [ ] 6.1 (Test) Viết unit test cho invoices.service.ts (Backend) để đảm bảo generateDraftFromJob (Task 1.4) tính toán tổng tiền (total) chính xác từ phụ tùng và giờ công.
o [ ] 6.2 (Test) Viết E2E test (Cypress) cho quy trình (flow) tạo hóa đơn.
o	[ ] 6.3 (Test) Test case E2E: (Giả lập 1 công Việc READY_FOR_INVOICING).
o	[ ] 6.4 (Test) Test case E2E: Vào trang Billing, nhấp "New Invoice". Xác minh modal
(Task 4.1) hiển thị công việc đó.
o [ ] 6.5 (Test) Test case E2E: Chọn công việc. Xác minh InvoiceModal mở ra ở chế độ 'draft' với các mục đã được điền sẵn.
o	[ ] 6.6 (Test) Test case E2E: Nhấp "Send Invoice". Xác minh modal đóng lại.
o	[ ] 6.7 (Test) Test case E2E: Xác minh hóa đơn mới xuất hiện trong InvoicesTable với
trạng thái "Pending".
o [ ] 6.8 (Test) Test case E2E: Nhấp vào hóa đơn đó. Nhấp "Record Payment". Xác minh trạng thái trong bảng (table) chuyển thành "Paid". 
Relevant Files
•	packages/frontend-admin/src/pages/CustomersPage.tsx - Component trang chính cho mô-đun Khách hàng.
•	packages/frontend-admin/src/components/customers/CustomerCard.tsx - Component thẻ (card) tóm tắt khách hàng.
•	packages/frontend-admin/src/components/customers/CustomerFilterBar.tsx - Component chứa thanh tìm kiếm và các nút lọc.
•	packages/frontend-admin/src/components/customers/CustomerFormModal.tsx - (Mới) Modal để Thêm/Sửa thông tin khách hàng cơ bản.
•	packages/frontend-admin/src/components/customers/CustomerDetailModal.tsx - Component modal chính, đa tab (master view) (từ wireframe).
•	packages/frontend-admin/src/components/customers/tabs/OverviewTab.tsx - Component cho tab Overview bên trong modal.
•	packages/frontend-admin/src/components/customers/tabs/ContactsTab.tsx - Component cho tab Contacts (bao gồm CRUD).
•	packages/frontend-admin/src/components/customers/tabs/EquipmentTab.tsx - Component cho tab Equipment (chỉ đọc, lọc).
•	packages/frontend-admin/src/components/customers/tabs/HistoryTab.tsx - Component cho tab Service History (chỉ đọc, lọc).
•	packages/frontend-admin/src/components/customers/tabs/BillingTab.tsx - Component cho tab Billing (chỉ đọc, lọc).
•	packages/backend/src/modules/customers/customers.controller.ts - (Backend) API controller chính cho CRUD Customer.
•	packages/backend/src/modules/customers/customers.service.ts - (Backend) Service chính cho Customer.
•	packages/backend/src/modules/customers/contacts.controller.ts - (Backend) API controller cho CRUD Contact (liên quan đến customerId).
•	packages/backend/src/modules/customers/contacts.service.ts - (Backend) Service cho Contact.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Task 4.0 (Tích hợp Modal Chi tiết) là phức tạp nhất vì nó yêu cầu gọi API đến nhiều mô- đun khác nhau (Equipment, History, Billing) với bộ lọc customerId.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-customers)
•	[ ] 1.0 (Backend) Tạo API Endpoints cho Customers (Khách hàng)
o [ ] 1.1 (Backend) Tạo customers.module.ts, customers.controller.ts, customers.service.ts.
o [ ] 1.2 (Backend) Tạo hàm getAllCustomers(filterDto) hỗ trợ tìm kiếm (search), lọc (tier, contract status) và phân trang (PRD 4.1, 4.3).
o [ ] 1.3 (Backend) (Phức tạp) Hàm (Task 1.2) phải tính toán hoặc JOIN các thống kê tóm tắt (Total Tickets, Revenue) cho mỗi khách hàng (PRD 4.2). (Cân nhắc cache/cron job nếu chậm).
o	[	]	1.4	(Backend)	Tạo	endpoint	GET /customers gọi hàm (Task 1.2).
o	[	]	1.5	(Backend)	Tạo	endpoint	POST /customers (Thêm khách hàng)	(PRD	4.4).
o	[	]	1.6	(Backend)	Tạo	endpoint	PATCH /customers/:id (Sửa khách hàng).
o	[	]	1.7	(Backend)	Tạo	endpoint	GET /customers/:id/details (dùng cho	Modal	Chi tiết)
(PRD 4.1).
•	[ ] 2.0 (Backend) Tạo API Endpoints cho Contacts (Danh bạ)
o	[	]	2.1	(Backend)	Tạo	contacts.module.ts, contacts.controller.ts, contacts.service.ts.
o	[	]	2.2	(Backend)	Tạo	endpoint GET /contacts?customerId=... (lấy danh bạ theo khách
hàng) (PRD 4.8).
o	[	]	2.3	(Backend)	Tạo	endpoint POST /contacts (Thêm danh bạ, yêu cầu customerId).
o	[	]	2.4	(Backend)	Tạo	endpoint PATCH /contacts/:id (Sửa danh bạ).
•	[ ] 3.0 (Frontend) Xây dựng Trang chính Customers
o	[	]	3.1	(Frontend)	Tạo	CustomersPage.tsx.
o	[	]	3.2	(Frontend)	Tạo	CustomerFilterBar.tsx (Tìm kiếm, Lọc) (PRD 4.3).
o	[	]	3.3	(Frontend)	Gọi	API GET /customers (Task 1.4) (truyền các bộ lọc)	và	render lưới
các CustomerCard.tsx.
o	[	]	3.4	(Frontend)	Tạo	CustomerFormModal.tsx.
o	[	]	3.5	(Frontend)	Nút	"Add Customer" (PRD 4.4) mở modal (Task 3.4) ở	chế độ
"Create".
o [ ] 3.6 (Frontend) (Tùy chọn) Thêm nút "Edit" trên CustomerCard để mở modal (Task 3.4) ở chế độ "Edit".
o [ ] 3.7 (Frontend) Nhấp vào CustomerCard (PRD 4.5) gọi hàm openDetailModal(customer.id).
•	[ ] 4.0 (Frontend) Xây dựng Modal Chi tiết Khách hàng (CustomerDetailModal)
o [ ] 4.1 (Frontend) Tạo CustomerDetailModal.tsx. Quản lý selectedCustomerId và trạng thái isOpen.
o [ ] 4.2 (Frontend) Khi modal mở, gọi GET /customers/:id/details (Task 1.7) để lấy dữ liệu header/overview.
o [ ] 4.3 (Frontend) Tạo cấu trúc các Tab (Overview, Contacts, Equipment, History, Billing).
o [ ] 4.4 (Frontend) (Tùy chọn) Implement "lazy loading" cho các tab (chỉ gọi API cho tab khi người dùng nhấp vào).
•	[ ] 5.0 (Frontend) Tích hợp các Tab trong Modal Chi tiết
o [ ] 5.1 (Frontend) (Tab Contacts) Tạo ContactsTab.tsx. Gọi API GET /contacts?customerId=... (Task 2.2). Implement UI để Thêm/Sửa/Xóa Contact (PRD 4.8).
o [ ] 5.2 (Frontend) (Tab Equipment) Tạo EquipmentTab.tsx. Gọi API GET /equipment?customerId=... (Endpoint này cần được tạo hoặc sửa đổi trong EquipmentModule). Hiển thị danh sách chỉ đọc (PRD 4.9).
o [ ] 5.3 (Frontend) (Tab History) Tạo HistoryTab.tsx. Gọi API GET /history/timeline?customerId=... (Endpoint này cần được tạo hoặc sửa đổi trong HistoryModule). Hiển thị timeline chỉ đọc (PRD 4.10).
o [ ] 5.4 (Frontend) (Tab Billing) Tạo BillingTab.tsx. Gọi API GET /invoices?customerId=... (Endpoint này cần được tạo hoặc sửa đổi trong BillingModule). Hiển thị bảng hóa đơn chỉ đọc (PRD 4.12).
•	[ ] 6.0 (Testing) Kiểm thử Tích hợp
o [ ] 6.1 (Test) Viết unit test cho customers.service.ts (Backend) để đảm bảo query (Task 1.3) tính toán thống kê (Revenue) chính xác.
o	[	]	6.2	(Test)	Viết E2E test (Cypress) cho CustomersPage.tsx.
o	[	]	6.3	(Test)	Test case	E2E:	Tải trang. Nhấp vào khách hàng	"Bach	Mai	Hospital".
o	[	]	6.4	(Test)	Test case	E2E:	Xác minh modal chi tiết mở ra.
o	[	]	6.5	(Test)	Test case	E2E:	Nhấp vào tab "Equipment". Xác	minh	danh	sách	thiết bị
(ví dụ: "Varian TrueBeam") được tải.
o [ ] 6.6 (Test) Test case E2E: Nhấp vào tab "Billing". Xác minh danh sách hóa đơn (ví dụ: "INV-2024-1847") được tải.
o [ ] 6.7 (Test) Test case E2E: Đóng modal. Lọc danh sách "Platinum Tier". Xác minh chỉ "Bach Mai Hospital" xuất hiện. 
Relevant Files
•	packages/frontend-admin/src/pages/DashboardPage.tsx - Component trang chính chứa layout của Dashboard.
•	packages/frontend-admin/src/components/dashboard/StatCard.tsx - Component cho 4 thẻ KPI (Pending, In Progress, v.v.).
•	packages/frontend-admin/src/components/dashboard/TicketList.tsx - Component chứa danh sách các ticket đang hoạt động.
•	packages/frontend-admin/src/components/dashboard/TicketCard.tsx - Component cho một thẻ ticket riêng lẻ trong danh sách.
•	packages/frontend-admin/src/components/dashboard/AdvancedFilter.tsx - Component chứa modal/pop-up cho bộ lọc nâng cao (Status, Priority, Tech, Customer).
•	packages/frontend-admin/src/components/dashboard/ActivityFeed.tsx - Component cho timeline hoạt động gần đây.
•	packages/frontend-admin/src/components/dashboard/QuickActions.tsx - Component cho các nút hành động nhanh.
•	packages/backend/src/modules/dashboard/dashboard.controller.ts - (Backend) API controller để xử lý các yêu cầu dữ liệu cho Dashboard.
•	packages/backend/src/modules/dashboard/dashboard.service.ts - (Backend) Service chứa logic nghiệp vụ để tổng hợp dữ liệu (lấy KPI, lọc ticket).
•	packages/backend/src/modules/dashboard/dashboard.gateway.ts - (Backend) (Tùy chọn) WebSocket gateway để đẩy (push) cập nhật real-time.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Hãy đảm bảo logic lọc (Task 1.4) ở backend chính xác để hỗ trợ cho bộ lọc nâng cao
(Task 4.0) ở frontend.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-dashboard)
•	[ ] 1.0 (Backend) Tạo API Endpoint cho Dashboard
o [ ] 1.1 (Backend) Tạo các file dashboard.module.ts, dashboard.controller.ts, và
dashboard.service.ts trong packages/backend/src/modules/dashboard/.
o [ ] 1.2 (Backend) Trong dashboard.service.ts, tạo hàm getKpiSummary() để đếm các ticket dựa trên các trạng thái KPI yêu cầu (Pending Approval, In Progress, Pending Parts, Awaiting Payment).
o [ ] 1.3 (Backend) Trong dashboard.controller.ts, tạo endpoint GET /dashboard/kpi gọi hàm getKpiSummary().
o [ ] 1.4 (Backend) Trong dashboard.service.ts, tạo hàm getActiveTickets(filterDto) hỗ trợ lọc và phân trang.
o [ ] 1.5 (Backend) Đảm bảo hàm getActiveTickets chấp nhận các tham số (query params) từ PRD: status[], priority[], technicianId[], customerId[].
o [ ] 1.6 (Backend) Đảm bảo query lọc ra các ticket không ở trạng thái COMPLETED, CANCELLED, hoặc WARRANTY_EXPIRED và join (include) dữ liệu Customer (tên BV) và User (tên Kỹ thuật viên).
o [ ] 1.7 (Backend) Trong dashboard.controller.ts, tạo endpoint GET /dashboard/active-tickets gọi hàm getActiveTickets.
o [ ] 1.8 (Backend) Trong dashboard.service.ts, tạo hàm getRecentActivityO (truy vấn 5-10 sự kiện mới nhất từ bảng ActivityLog hoặc tương tự).
o [ ] 1.9 (Backend) Trong dashboard.controller.ts, tạo endpoint GET /dashboard/activity gọi hàm getRecentActivity().
•	[ ] 2.0 (Frontend) Xây dựng Cấu trúc (Layout) cho Dashboard
o [ ] 2.1 (Frontend) Tạo file DashboardPage.tsx (packages/frontend- admin/src/pages/DashboardPage.tsx).
o [ ] 2.2 (Frontend) Implement bố cục 2 cột (ví dụ: grid-cols-[2fr_1fr]) theo yêu cầu trong PRD (mục 6. Design).
o [ ] 2.3 (Frontend) Tạo và import các component placeholder (khung sườn) vào layout: StatCardGrid, TicketListPanel, ActivityPanel, QuickActionsPanel.
•	[ ] 3.0 (Frontend) Xây dựng Thẻ Thống kê (KPI Cards)
o [ ] 3.1 (Frontend) Tạo component StatCard.tsx
(.../components/dashboard/StatCard.tsx) nhận title và value làm props.
o [ ] 3.2 (Frontend) Trong DashboardPage.tsx (hoặc component StatCardGrid), gọi API GET /dashboard/kpi (từ Task 1.3) bằng useQuery hoặc useEffect.
o [ ] 3.3 (Frontend) Hiển thị 4 component StatCard với dữ liệu (hoặc trạng thái loading) từ API.
•	[ ] 4.0 (Frontend) Xây dựng và Kết nối Bộ lọc Nâng cao (Advanced Filter)
o [ ] 4.1 (Frontend) Tạo component AdvancedFilter.tsx
(.../components/dashboard/AdvancedFilter.tsx) với một nút "Filter" để mở Modal/Popover.
o [ ] 4.2 (Frontend) Bên trong Modal/Popover, gọi API để lấy danh sách (ví dụ: GET /customers, GET /users?role=TECHNICIAN) để điền vào các tùy chọn lọc.
o [ ] 4.3 (Frontend) Xây dựng các trường lọc (select/checkbox) cho: Trạng thái, Ưu tiên, Kỹ thuật viên, Khách hàng.
o [ ] 4.4 (Frontend) Quản lý trạng thái của các bộ lọc đang được chọn (ví dụ: dùng
useState).
o [ ] 4.5 (Frontend) Cung cấp nút "Apply" (áp dụng bộ lọc) và "Clear Filters" (xóa bộ lọc).
o [ ] 4.6 (Frontend) Sử dụng Context, Zustand, hoặc props để truyền các bộ lọc đã áp dụng (Applied Filters) đến TicketList (Task 5.0).
•	[ ] 5.0 (Frontend) Xây dựng Danh sách Ticket (Ticket List)
o [ ] 5.1 (Frontend) Tạo component TicketCard.tsx
(.../components/dashboard/TicketCard.tsx) nhận ticket object làm prop.
o [ ] 5.2 (Frontend) Style cho TicketCard để hiển thị rõ ràng: ID, Priority (huy hiệu màu), Equipment, Hospital, Status, Technician.
o [ ] 5.3 (Frontend) Tạo component TicketList.tsx
(.../components/dashboard/TicketList.tsx).
o [ ] 5.4 (Frontend) Trong TicketList.tsx, gọi API GET /dashboard/active-tickets (từ Task 1.7).
o [ ] 5.5 (Frontend) Đảm bảo API call gửi các tham số lọc hiện tại (từ Task 4.6) và các tham số phân trang (ví dụ: page=1).
o [ ] 5.6 (Frontend) Render danh sách các TicketCard từ dữ liệu API. Hiển thị trạng thái loading/error/empty.
o [ ] 5.7 (Frontend) Thêm onClick vào TicketCard để kích hoạt modal chi tiết ticket (theo PRD).
o [ ] 5.8 (Frontend) Implement các nút điều khiển phân trang (Pagination controls) nếu API hỗ trợ.
•	[ ] 6.0 (Frontend) Xây dựng Panel Phụ (Activity & Actions)
o [ ] 6.1 (Frontend) Tạo component ActivityFeed.tsx
(.../components/dashboard/ActivityFeed.tsx).
o [ ] 6.2 (Frontend) Gọi API GET /dashboard/activity (từ Task 1.9) và hiển thị kết quả dạng timeline.
o [ ] 6.3 (Frontend) Tạo component QuickActions.tsx
(.../components/dashboard/QuickActions.tsx).
o [ ] 6.4 (Frontend) Thêm nút "Create New Ticket" (kích hoạt modal) và các nút điều hướng (dùng Link/useNavigate) đến /inventory, /schedule, /reports.
•	[ ] 7.0 (Testing) Kiểm thử Tích hợp
o [ ] 7.1 (Test) Viết unit test cho dashboard.service.ts (Backend) để đảm bảo logic lọc và đếm KPI chính xác.
o	[	]	7.2	(Test)	Viết E2E test (ví dụ: Cypress) cho DashboardPage.tsx (Frontend).
o	[	]	7.3	(Test)	Test case E2E: Trang tải thành công và hiển thị 4 KPI.
o	[	]	7.4	(Test)	Test case E2E: Mở bộ lọc, chọn 1 Kỹ thuật viên, nhấn "Apply". Xác	minh
rằng danh sách ticket chỉ hiển thị các ticket của kỹ thuật viên đó.
o [ ] 7.5 (Test) Test case E2E: Nhấn "Clear Filters" và xác minh danh sách quay lại trạng thái ban đầu.
Relevant Files
•	packages/frontend-admin/src/components/common/ImportModal.tsx - (Mới) Component modal chung, tái sử dụng cho tất cả các loại import (PRD 4.2).
•	packages/frontend-admin/src/pages/InventoryPage.tsx - (Sửa đổi) Thêm nút "Import Parts" (PRD 4.1).
•	packages/frontend-admin/src/pages/CustomersPage.tsx - (Sửa đổi) Thêm nút "Import Customers" (PRD 4.1).
•	packages/frontend-admin/src/pages/EquipmentPage.tsx - (Sửa đổi) Thêm 3 nút Import (Models, Equipment, BOM) (PRD 4.1).
•	packages/backend/src/modules/data-import/data-import.module.ts - (Mới) Mô-đun xử lý import.
•	packages/backend/src/modules/data-import/data-import.controller.ts - (Mới) API controller chứa tất cả các endpoint (ví dụ: POST /data-import/parts).
•	packages/backend/src/modules/data-import/data-import.service.ts - (Mới) Service chứa logic phân tích (parsing) Excel và "Upsert" (PRD 4.3, 4.4).
•	packages/backend/src/modules/data-import/templates/ - (Mới) Thư mục chứa các file Excel mẫu (template) (PRD 4.2).
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Task 3.0 (Logic Backend) là phần quan trọng và phức tạp nhất, đòi hỏi kiến thức về Giao dịch (Transactions).
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-data-import)
•	[ ] 1.0 (Backend) Thiết lập Nền tảng Import
o [ ] 1.1 (Backend) Cài đặt thư viện xlsx (npm install xlsx).
o [ ] 1.2 (Backend) Tạo data-import.module.ts, data-import.controller.ts, data- import.service.ts.
o [ ] 1.3 (Backend) Trong data-import.service.ts, tạo một hàm tiện ích (helper function) parseExcel(fileBuffer) (PRD 4.3).
o [ ] 1.4 (Backend) Trong data-import.service.ts, tạo một hàm bọc (wrapper)
runInTransaction(logicFunction) để đảm bảo tất cả import đều là "all-or-nothing" (PRD 4.3).
•	[ ] 2.0 (Frontend) Xây dựng Giao diện Import (UI)
o	[	]	2.1 (Frontend)	Tạo component ImportModal.tsx (PRD 4.2).
o	[	]	2.2 (Frontend)	Modal này nhận 1 prop importType (ví dụ: 'parts', 'customers').
o	[	]	2.3 (Frontend)	Dựa trên importType, modal hiển thị link "Download Template"
chính xác (ví dụ: GET /data-import/template/parts) (PRD 4.2).
o [ ] 2.4 (Frontend) Implement vùng kéo-thả (ví dụ: react-dropzone) để tải file lên (PRD 4.2).
o [ ] 2.5 (Frontend) Khi file được tải lên, modal gọi API endpoint tương ứng (ví dụ: POST /data-import/parts).
o [ ] 2.6 (Frontend) Hiển thị thông báo Success (Thành công) hoặc Error (Lỗi) (với thông báo lỗi từ backend) (PRD 4.5).
o	[	]	2.7	(Frontend)	Thêm	nút "Import Parts" vào InventoryPage.tsx (PRD 4.1).
o	[	]	2.8	(Frontend)	Thêm	nút "Import Customers" vào CustomersPage.tsx (PRD	4.1).
o	[	]	2.9	(Frontend)	Thêm	các nút "Import..." vào EquipmentPage.tsx (PRD 4.1).
•	[ ] 3.0 (Backend) Implement Logic Import (Upsert)
o [ ] 3.1 (Backend) Tạo 5 file Excel mẫu (template) (1 cho mỗi loại) và đặt chúng trong packages/backend/src/modules/data-import/templates/ (PRD 4.2).
o [ ] 3.2 (Backend) Tạo endpoint GET /data-import/template/:type để tải các file mẫu này (PRD 4.2).
o [ ] 3.3 (Backend) Tạo endpoint POST /data-import/parts (sử dụng @UseInterceptors(FileInterceptor(...))).
o [ ] 3.4 (Backend) Trong data-import.service.ts, tạo hàm importParts(fileBuffer) (bọc trong runInTransaction). Logic: Phân tích file; Lặp (Loop) qua các hàng; Upsert vào parts (Bảng 11) dựa trên part_number (PRD 4.4).
o	[	]	3.5	(Backend)	Tạo	endpoint POST /data-import/customers.
o	[	]	3.6	(Backend)	Tạo	hàm importCustomers(fileBuffer) (bọc trong runInTransaction).
Logic: Upsert vào customers (Bảng 2) dựa trên tax_id (PRD 4.4).
o	[	]	3.7	(Backend)	Tạo	endpoint POST /data-import/equipment-models.
o	[	]	3.8	(Backend)	Tạo	hàm importEquipmentModels(fileBuffer) (bọc trong
runInTransaction). Logic: Upsert vào equipment_models (Bảng 4) dựa trên model_number (PRD 4.4).
•	[ ] 4.0 (Backend) Implement Logic Import (Phức tạp - Liên kết)
o	[ ] 4.1 (Backend) Tạo endpoint POST /data-import/equipment.
o	[ ] 4.2 (Backend) Tạo hàm importEquipment(fileBuffer) (bọc trong runInTransaction)
(PRD 4.5).
o [ ] 4.3 (Backend) Logic (Task 4.2): Lặp qua các hàng. Với mỗi hàng:
■	customer_id = await customerService.findIdByName(row['customer_name']). (Nếu không tìm thấy -> Ném lỗi) (PRD 4.5).
■	model_id = await modelService.findIdByModelNumber(row['model_number']).
(Nếu không tìm thấy -> Ném lỗi) (PRD 4.5).
■	await equipmentService.upsertBySerialNumber({ ..., customer_id, model_id }).
o	[ ] 4.4 (Backend) Tạo endpoint POST /data-import/spare-part-list.
o	[ ] 4.5 (Backend) Tạo hàm importSparePartList(fileBuffer) (bọc trong
runInTransaction) (PRD 4.5).
o [ ] 4.6 (Backend) Logic (Task 4.5): Lặp qua các hàng (cột A: model_number, cột B: part_number):
■	Tìm model_id và part_id (tương tự Task 4.3).
■	await partListService.upsert({ model_id, part_id }).
•	[ ] 5.0 (Testing) Kiểm thử Giao dịch (Transactions)
o	[ ] 5.1 (Test) Viết unit test cho data-import.service.ts (Backend).
o	[ ] 5.2 (Test) Test case Unit: importParts với file Excel chứa 5 hàng (3 mới, 2 cập
nhật). Xác minh 3 hàng được tạo và 2 hàng được cập nhật.
o [ ] 5.3 (Test) Test case Unit (Quan trọng): importParts với file Excel chứa 5 hàng, trong đó hàng 4 có lỗi (ví dụ: stock là "abc"). Xác minh CSDL không thay đổi (0 hàng được tạo/cập nhật) và hàm ném (throw) lỗi. (PRD 4.3).
o [ ] 5.4 (Test) Test case Unit (Quan trọng): importEquipment với file Excel chứa 1 hàng có customer_name không tồn tại. Xác minh CSDL không thay đổi và ném lỗi. (PRD 4.5).
o	[ ] 5.5 (Test) Viết E2E test (Cypress).
o	[ ] 5.6 (Test) Test case E2E: Tải trang Inventory. Tải lên file Excel parts.xlsx hợp lệ.
Xác minh thông báo "Thành công" và bảng InventoryTable được cập nhật.
o [ ] 5.7 (Test) Test case E2E: Tải trang Inventory. Tải lên file Excel parts_invalid.xlsx (có lỗi). Xác minh thông báo lỗi (ví dụ: "Lỗi ở Dòng 4:...") xuất hiện (PRD 4.5). 
Relevant Files
•	packages/frontend-admin/src/pages/EquipmentPage.tsx - (Mới) Trang quản lý (CRUD) thiết bị cho Admin.
•	packages/frontend-admin/src/components/equipment/EquipmentTable.tsx - (Mới) Bảng (table) hiển thị tất cả thiết bị (có lọc).
•	packages/frontend-admin/src/components/equipment/EquipmentFormModal.tsx - (Mới) Modal (form) cho Admin để Thêm/Sửa thiết bị.
•	packages/backend/src/modules/equipment/equipment.controller.ts - (Mới) API controller cho CRUD Equipment (bảo vệ bởi AdminGuard).
•	packages/backend/src/modules/equipment/equipment.service.ts - (Mới) Service cho CRUD Equipment.
•	packages/mobile-app/src/screens/AddEquipmentScreen.tsx - (Mới) Màn hình (form) cho Kỹ thuật viên thêm thiết bị (Offline).
•	packages/mobile-app/src/database/schema.ts - (Sửa đổi) Thêm bảng equipment vào CSDL cục bộ.
•	packages/mobile-app/src/database/models/Equipment.ts - (Mới) Model CSDL cục bộ cho Equipment.
•	packages/mobile-app/src/services/SyncService.ts - (Sửa đổi) Cần cập nhật logic pushChanges để gửi thiết bị mới.
•	packages/backend/src/modules/sync/sync.service.ts - (Sửa đổi) Cần cập nhật logic pushChanges (phía backend) để nhận và tạo thiết bị.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Task 3.0 (Backend Sync) và 5.0 (Mobile Offline) là rất quan trọng để đáp ứng Yêu cầu 1.B.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/equipment-management)
•	[ ] 1.0 (Backend) Tạo API CRUD cho Admin
o [ ] 1.1 (Backend) Tạo equipment.module.ts, equipment.controller.ts,
equipment.service.ts.
o [ ] 1.2 (Backend) Cập nhật Equipment entity/model để bao gồm customerId (liên kết
Customer) (FR-E1).
o [ ] 1.3 (Backend) Trong equipment.controller.ts, tạo endpoint GET /equipment (hỗ trợ lọc/tìm kiếm) (FR-E3).
o [ ] 1.4 (Backend) Trong equipment.controller.ts, tạo endpoint POST /equipment (nhận DTO với customerId) (FR-E5).
o [ ] 1.5 (Backend) Trong equipment.controller.ts, tạo endpoint PATCH /equipment/:id (để sửa) (FR-E6).
o [ ] 1.6 (Backend) Bảo vệ tất cả các endpoint (Task 1.3-1.5) bằng AdminGuard (FR-E2).
•	[ ] 2.0 (Frontend - Admin) Xây dựng Giao diện Quản lý Thiết bị
o [ ] 2.1 (Frontend) Tạo EquipmentPage.tsx và thêm nó vào menu điều hướng chính (admin) (FR-E2).
o	[	]	2.2	(Frontend)	Tạo EquipmentTable.tsx.
o	[	]	2.3	(Frontend)	Gọi GET /equipment (Task 1.3) và render bảng (table).
o	[	]	2.4	(Frontend)	Implement thanh tìm kiếm (S/N, Name) và lọc (Customer)	cho	bảng
(Task 2.3) (FR-E3).
o	[	]	2.5	(Frontend)	Tạo EquipmentFormModal.tsx (cho cả Add/Edit).
o	[	]	2.6	(Frontend)	Form (Task 2.5) phải có trường AsyncSelect (hoặc tương	tự)	để	tìm
kiếm và chọn Customer (gọi GET /customers/search) (FR-E5).
o [ ] 2.7 (Frontend) Kết nối nút "Add Equipment" (Task 2.1) và nút "Edit" (Task 2.3) với EquipmentFormModal.
o [ ] 2.8 (Frontend) Khi submit form, gọi POST /equipment (Tạo) hoặc PATCH /equipment/:id (Sửa).
o [ ] 2.9 (Frontend) Sau khi submit, đóng modal và refetch (làm mới) bảng (Task 2.3).
•	[ ] 3.0 (Backend - Mobile Sync) Cập nhật Logic Đồng bộ
o	[ ] 3.1 (Backend) Sửa đổi sync.service.ts (từ Epic 8.0) (FR-E14).
o	[ ] 3.2 (Backend) Cập nhật logic pushChanges (phía backend) để kiểm tra xem
payload (gói) có mảng equipment: [] không.
o [ ] 3.3 (Backend) Nếu có, lặp (iterate) qua mảng và gọi equipmentService.create(item) cho mỗi thiết bị mới.
•	[ ] 4.0 (Mobile) Cập nhật CSDL Cục bộ (Local DB)
o [ ] 4.1 (Mobile) Sửa đổi database/schema.ts (từ Epic 8.0) để thêm bảng equipment (FR-E12).
o [ ] 4.2 (Mobile) Bảng equipment cục bộ phải bao gồm customerId và _status (để đồng bộ).
o [ ] 4.3 (Mobile) Tạo model Equipment.ts (database/models/Equipment.ts).
•	[ ] 5.0 (Mobile) Xây dựng Giao diện "Add Equipment" (Offline)
o	[ ] 5.1 (Mobile) Tạo AddEquipmentScreen.tsx (FR-E8).
o	[ ] 5.2 (Mobile) Tạo một nút (ví dụ: trên HomeScreen) để điều hướng đến
AddEquipmentScreen (FR-E7).
o [ ] 5.3 (Mobile) Màn hình này phải nhận (hoặc truy vấn) customerId từ công việc (job) hiện tại.
o	[ ] 5.4 (Mobile) Xây dựng form đơn giản (Tên, S/N, Model).
o	[ ] 5.5 (Mobile) Khi "Lưu" (Save), không gọi API. Thay vào đó, tạo một bản ghi
Equipment mới trong CSDL cục bộ (WatermelonDB/Realm) (FR-E9).
o [ ] 5.6 (Mobile) Đảm bảo bản ghi mới có customerId (Task 5.3) và _status: 'created' (FR-E10, FR-E11).
o	[ ] 5.7 (Mobile) Sửa đổi SyncService.ts (phía di động) (FR-E13).
o	[ ] 5.8 (Mobile) Cập nhật logic pushChanges (phía di động) để thu thập các bản ghi
equipment có _status: 'created' và gửi chúng lên POST /sync/push (Task 3.2).
•	[ ] 6.0 (Testing) Kiểm thử Quy trình (Flow) Kép
o	[ ] 6.1 (Test) Viết E2E test (Cypress) cho EquipmentPage.tsx (Admin).
o	[ ] 6.2 (Test) Test case E2E (Admin): Tải trang. Thêm Thiết bị mới ("Test MRI", Khách
hàng: "Bach Mai"). Xác minh nó xuất hiện trong bảng. Chỉnh sửa nó. Xác minh thay đổi.
o	[	]	6.3	(Test)	Test	case	E2E	(Mobile -	Offline): Mở ứng dụng (có mạng). Tắt mạng.
o	[	]	6.4	(Test)	Test	case	E2E	(Mobile):	Mở một công việc của "Bach Mai".	Nhấp "Add
Equipment". Tạo "Test CT (Offline)". Lưu.
o	[	]	6.5	(Test)	Test	case	E2E	(Mobile):	Bật mạng. Chờ đồng bộ.
o	[	]	6.6	(Test)	Test	case	E2E	(Admin):	Tải lại EquipmentPage.tsx (Admin).	Xác minh
"Test CT (Offline)" xuất hiện và được liên kết chính xác với "Bach Mai". 
Relevant Files
•	packages/frontend-admin/src/pages/HistoryPage.tsx - Component trang chính cho mô- đun Lịch sử.
•	packages/frontend-admin/src/components/history/EquipmentSelector.tsx - Component tìm kiếm và chọn thiết bị (selectedEquipmentId).
•	packages/frontend-admin/src/components/history/HistorySummaryCards.tsx - Component cho 4 thẻ KPI (Total, Repairs, v.v.).
•	packages/frontend-admin/src/components/history/HistoryTimeline.tsx - Component chứa danh sách các HistoryItemCard.
•	packages/frontend-admin/src/components/history/HistoryltemCard.tsx - Component chi tiết cho một mục lịch sử (hiển thị Kỹ thuật viên, Phụ tùng, Bảo hành).
•	packages/frontend-admin/src/components/history/HistoryFilterBar.tsx - Component chứa các nút lọc (All, Repairs, Maintenance).
•	packages/frontend-admin/src/stores/history-filter.store.ts - Store (Zustand/Context) để quản lý selectedEquipmentId và selectedServiceType.
•	packages/backend/src/modules/history/history.controller.ts - (Backend) API controller, cung cấp GET /history/summary và GET /history/timeline.
•	packages/backend/src/modules/history/history.service.ts - (Backend) Service chứa logic truy vấn (query) SQL/ORM phức tạp để lấy dữ liệu lịch sử.
•	packages/backend/src/modules/equipment/equipment.controller.ts - (Backend) API controller, cung cấp GET /equipment/search để hỗ trợ EquipmentSelector.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Trọng tâm là trang phải "phản ứng" (react) với sự thay đổi của selectedEquipmentId.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-history)
•	[ ] 1.0 (Backend) Tạo API Endpoints cho Lịch sử
o	[ ] 1.1 (Backend) Tạo history.module.ts, history.controller.ts, history.service.ts.
o	[ ] 1.2 (Backend) Tạo endpoint (trong equipment.controller.ts) GET
/equipment/search?query=... để hỗ trợ component EquipmentSelector (PRD 4.1).
o [ ] 1.3 (Backend) Trong history.service.ts, tạo hàm getHistorySummary(equipmentld) (đếm tổng số, sửa chữa, bảo trì, v.v. cho equipmentId đó).
o [ ] 1.4 (Backend) Trong history.controller.ts, tạo endpoint GET /history/summary yêu cầu equipmentId (PRD 6.3).
o [ ] 1.5 (Backend) Trong history.service.ts, tạo hàm getHistoryTimeline(equipmentId, filterDto).
o [ ] 1.6 (Backend) Đảm bảo getHistoryTimeline lọc các ticket đã hoàn thành theo equipmentId VÀ hỗ trợ lọc theo serviceType (ví dụ: 'REPAIR') (PRD 6.5).
o [ ] 1.7 (Backend) Đảm bảo query này JOIN (hoặc include) User (Technician), TicketParts, Parts, Warranty để lấy tất cả dữ liệu cho HistoryItemCard (PRD 6.6).
o [ ] 1.8 (Backend) Trong history.controller.ts, tạo endpoint GET /history/timeline yêu cầu equipmentId và serviceType tùy chọn (PRD 6.5).
•	[ ] 2.0 (Frontend) Xây dựng Cấu trúc Trang History và State
o	[ ] 2.1 (Frontend) Tạo file HistoryPage.tsx.
o	[ ] 2.2 (Frontend) Tạo store history-filter.store.ts (Zustand) để quản lý
selectedEquipmentId (mặc định null) và selectedServiceType (mặc định 'ALL') (PRD 6.0).
o [ ] 2.3 (Frontend) Tạo component EquipmentSelector.tsx.
o [ ] 2.4 (Frontend) Implement EquipmentSelector với (ví dụ) AsyncSelect (từ react- select) gọi API GET /equipment/search (Task 1.2).
o [ ] 2.5 (Frontend) Khi một thiết bị được chọn, gọi setSelectedEquipmentId trong store.
•	[ ] 3.0 (Frontend) Xây dựng các Component Dữ liệu
o [ ] 3.1 (Frontend) Tạo HistorySummaryCards.tsx. Component này đọc selectedEquipmentId từ store.
o [ ] 3.2 (Frontend) HistorySummaryCards gọi API GET /history/summary (Task 1.4) (chỉ gọi khi selectedEquipmentId không phải null).
o [ ] 3.3 (Frontend) Hiển thị 4 thẻ KPI với dữ liệu (hoặc trạng thái "Vui lòng chọn thiết bị").
o [ ] 3.4 (Frontend) Tạo HistoryFilterBar.tsx. Component này chứa các nút (All, Repairs, Maintenance) và gọi setSelectedServiceType trong store khi nhấp (PRD 4.4).
o [ ] 3.5 (Frontend) Tạo HistoryItemCard.tsx. Component này nhận item (dữ liệu ticket) làm prop và render tất cả các chi tiết (Kỹ thuật viên, Phụ tùng, Bảo hành, v.v.) (PRD 4.6).
•	[ ] 4.0 (Frontend) Xây dựng Dòng thời gian (Timeline)
o	[ ] 4.1 (Frontend) Tạo HistoryTimeline.tsx.
o	[ ] 4.2 (Frontend) Component này đọc selectedEquipmentId và selectedServiceType
từ store.
o [ ] 4.3 (Frontend) Sử dụng useQuery để gọi API GET /history/timeline (Task 1.8), truyền cả hai giá trị từ store.
o [ ] 4.4 (Frontend) useQuery phải được enabled: false nếu selectedEquipmentId là
null.
o	[ ] 4.5 (Frontend) Render danh sách các HistoryltemCard từ dữ liệu API.
o	[ ] 4.6 (Frontend) Hiển thị thông báo "Vui lòng chọn một thiết bị để xem lịch sử" nếu
selectedEquipmentId là null.
•	[ ] 5.0 (Testing) Kiểm thử Tích hợp
o [ ] 5.1 (Test) Viết unit test cho history.service.ts (Backend) để đảm bảo các truy vấn (query) JOIN và lọc theo equipmentId hoạt động chính xác.
o	[ ] 5.2 (Test) Viết E2E test (Cypress) cho HistoryPage.tsx.
o	[ ] 5.3 (Test) Test case E2E: Tải trang. Xác minh rằng các Thẻ Tóm tắt và Dòng thời
gian hiển thị trạng thái "Vui lòng chọn thiết bị".
o [ ] 5.4 (Test) Test case E2E: Tìm kiếm và chọn "Varian TrueBeam" trong EquipmentSelector.
o [ ] 5.5 (Test) Test case E2E: Xác minh rằng các Thẻ Tóm tắt (KPIs) và Dòng thời gian (Timeline) bây giờ hiển thị dữ liệu.
o [ ] 5.6 (Test) Test case E2E: Nhấp vào bộ lọc "Repairs". Xác minh Dòng thời gian gọi lại API và chỉ hiển thị các mục "Repair". 
Relevant Files
•	packages/frontend-admin/src/pages/InventoryPage.tsx - Component trang chính cho mô-đun Kho.
•	packages/frontend-admin/src/components/inventory/InventoryKpiGrid.tsx - Component cho 4 thẻ KPI (Total, Low Stock, v.v.).
•	packages/frontend-admin/src/components/inventory/InventoryTable.tsx - Component bảng (table) hiển thị danh sách phụ tùng.
•	packages/frontend-admin/src/components/inventory/StockLevelBar.tsx - Component thanh % trực quan hiển thị mức tồn kho.
•	packages/frontend-admin/src/components/inventory/PartFormModal.tsx - Modal dùng chung cho cả "Add Part" (Thêm) và "Edit Part" (Sửa).
•	packages/frontend-admin/src/components/inventory/InventoryFilterBar.tsx - Component chứa thanh tìm kiếm và các nút lọc (Low Stock, Orders).
•	packages/backend/src/modules/inventory/parts.controller.ts - (Backend) API controller cho CRUD phụ tùng (Part).
•	packages/backend/src/modules/inventory/parts.service.ts - (Backend) Service chứa logic nghiệp vụ (lọc, cập nhật, ghi log).
•	packages/backend/src/modules/inventory/inventory.controller.ts - (Backend) API controller cho các KPI (ví dụ: GET /inventory/summary).
•	packages/backend/src/modules/inventory/inventory.service.ts - (Backend) Service để tính toán các KPI của kho.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Quy trình này là Thủ công (theo Lựa chọn A). Không cần xây dựng hệ thống PO.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-inventory)
•	[ ] 1.0 (Backend) Tạo API Endpoints cho Inventory (Kho)
o [ ] 1.1 (Backend) Tạo các file inventory.controller.ts và inventory.service.ts để xử lý các KPI.
o [ ] 1.2 (Backend) Trong inventory.service.ts, tạo hàm getInventorySummary() để tính
toán 4 KPI (Total Parts, Low Stock, On Order, Inventory Value) theo PRD 4.1.
o [ ] 1.3 (Backend) Trong inventory.controller.ts, tạo endpoint GET /inventory/summary gọi hàm getInventorySummary().
o [ ] 1.4 (Backend) Tạo các file parts.controller.ts và parts.service.ts để xử lý CRUD cho Phụ tùng (Part).
o [ ] 1.5 (Backend) Trong parts.service.ts, tạo hàm getAllParts(filterDto) hỗ trợ lọc và phân trang.
o [ ] 1.6 (Backend) Đảm bảo getAllParts hỗ trợ các tham số: search (cho Part
Number/Description), isLowStock (boolean), status (enum). (PRD 7.0)
o [ ] 1.7 (Backend) Trong parts.controller.ts, tạo endpoint GET /parts gọi hàm getAllParts.
o	[ ] 1.8 (Backend) Trong parts.service.ts, tạo hàm createPart(createPartDto).
o	[ ] 1.9 (Backend) Trong parts.controller.ts, tạo endpoint POST /parts gọi hàm
createPart.
o [ ] 1.10 (Backend) Trong parts.service.ts, tạo hàm updatePart(id, updatePartDto).
o [ ] 1.11 (Backend) Quan trọng: Sửa đổi hàm updatePart để nếu Stock thay đổi, nó phải tạo một bản ghi InventoryLog (PRD 4.5).
o [ ] 1.12 (Backend) Trong parts.controller.ts, tạo endpoint PATCH /parts/:id gọi hàm updatePart.
o [ ] 1.13 (Backend) Trong parts.controller.ts, tạo endpoint GET /parts/:id để lấy chi tiết một phụ tùng (dùng cho việc edit).
•	[ ] 2.0 (Frontend) Xây dựng Cấu trúc Trang Inventory
o	[	]	2.1 (Frontend) Tạo file InventoryPage.tsx (.../pages/InventoryPage.tsx).
o	[	]	2.2 (Frontend) Thêm Tiêu đề trang ("Parts Inventory") và nút "Add Part"	(PRD 4.4).
o	[	]	2.3 (Frontend) Tạo component InventoryKpiGrid.tsx
(.../components/inventory/InventoryKpiGrid.tsx).
o [ ] 2.4 (Frontend) Trong InventoryPage.tsx, gọi API GET /inventory/summary (Task
1.3)	và truyền dữ liệu cho InventoryKpiGrid.
o [ ] 2.5 (Frontend) Tạo component InventoryFilterBar.tsx
(.../components/inventory/InventoryFilterBar.tsx).
o [ ] 2.6 (Frontend) Trong InventoryFilterBar, thêm thanh tìm kiếm và các nút lọc "Low Stock", "Orders" (PRD 4.2).
o [ ] 2.7 (Frontend) Trong InventoryPage.tsx, quản lý trạng thái lọc (ví dụ: filterOptions, setFilterOptions).
•	[ ] 3.0 (Frontend) Xây dựng Bảng Danh sách Phụ tùng (Parts Table)
o [ ] 3.1 (Frontend) Tạo component StockLevelBar.tsx
(.../components/inventory/StockLevelBar.tsx) nhận stock và minStock làm props, hiển thị thanh % với màu sắc (Đỏ/Vàng/Xanh) (PRD 4.3).
o [ ] 3.2 (Frontend) Tạo component InventoryTable.tsx
(.../components/inventory/InventoryTable.tsx).
o [ ] 3.3 (Frontend) Trong InventoryTable.tsx, gọi API GET /parts (Task 1.7) sử dụng
useQuery.
o [ ] 3.4 (Frontend) Sử dụng useDebounce cho giá trị search từ InventoryFilterBar (PRD 7.0).
o	[ ] 3.5 (Frontend) Truyền filterOptions (từ Task 2.7) vào API call.
o	[ ] 3.6 (Frontend) Render bảng (table) hiển thị các cột theo PRD 4.3, sử dụng
StockLevelBar cho cột "Stock Level".
o [ ] 3.7 (Frontend) Thêm onClick vào mỗi hàng (row) của bảng, gọi hàm (ví dụ: handleOpenEditModal) và truyền part.id.
•	[ ] 4.0 (Frontend) Xây dựng Chức năng Thêm/Sửa Phụ tùng (CRUD)
o [ ] 4.1 (Frontend) Tạo component PartFormModal.tsx
(.../components/inventory/PartFormModal.tsx).
o [ ] 4.2 (Frontend) Modal này quản lý 2 chế độ: "Add" (ID là null) và "Edit" (ID được cung cấp).
o [ ] 4.3 (Frontend) Khi ở chế độ "Edit" (ID tồn tại), gọi API GET /parts/:id (Task 1.13) để điền dữ liệu vào form.
o [ ] 4.4 (Frontend) Xây dựng form với các trường yêu cầu (Part Number, Description, Stock, Min. Stock, Location, Status, Cost) (PRD 4.4, 4.5).
o [ ] 4.5 (Frontend) Đảm bảo trường Status là một dropdown (In Stock, On Order,
Order Needed) (PRD 4.5).
o [ ] 4.6 (Frontend) Trong InventoryPage.tsx, quản lý trạng thái mở/đóng của modal và selectedPartId.
o [ ] 4.7 (Frontend) Nút "Add Part" (Task 2.2) gọi handleOpenAddModal (set selectedPartId thành null và mở modal).
o [ ] 4.8 (Frontend) Hàm handleOpenEditModal (Task 3.7) set selectedPartId và mở modal.
o [ ] 4.9 (Frontend) Khi form submit, gọi POST /parts (Add) hoặc PATCH /parts/:id (Edit).
o [ ] 4.10 (Frontend) Sau khi submit thành công, đóng modal và gọi refetch (làm mới) cho cả API GET /parts và GET /inventory/summary.
•	[ ] 5.0 (Testing) Kiểm thử Tích hợp
o [ ] 5.1 (Test) Viết unit test cho inventory.service.ts (Backend) để đảm bảo các KPI
(Low Stock, Value) được tính toán chính xác.
o [ ] 5.2 (Test) Viết unit test cho parts.service.ts (Backend) để đảm bảo InventoryLog được tạo khi Stock thay đổi (PRD 4.5).
o	[ ] 5.3 (Test) Viết E2E test (Cypress) cho InventoryPage.tsx (Frontend).
o	[ ] 5.4 (Test) Test case E2E: Tải trang, nhập "motor" vào thanh tìm kiếm. Xác minh
bảng chỉ hiển thị các phụ tùng có tên "motor".
o [ ] 5.5 (Test) Test case E2E: Nhấp vào nút "Low Stock". Xác minh bảng chỉ hiển thị các phụ tùng có Stock < Min. Stock.
o [ ] 5.6 (Test) Test case E2E: Nhấp vào một phụ tùng, thay đổi Status thành "On Order", lưu lại. Xác minh huy hiệu "On Order" xuất hiện trên bảng.
○	[ ] 5.7 (Test) Test case E2E: Nhấp vào cùng phụ tùng đó, thay đổi Stock từ 5 lên 10,
lưu lại. Xác minh Stock Level trên bảng cập nhật thành 10. 
Relevant Files
•	packages/frontend-admin/src/pages/KnowledgeBasePage.tsx - Trang chính (Duyệt/Tìm kiếm) (từ knowledge-view).
•	packages/frontend-admin/src/components/kb/KbSearchBar.tsx - Thanh tìm kiếm.
•	packages/frontend-admin/src/components/kb/KbCategoryGrid.tsx - Lưới 4 thẻ danh
mục.
•	packages/frontend-admin/src/components/kb/KbArticleList.tsx - Component danh sách (dùng cho Popular/Recent).
•	packages/frontend-admin/src/components/kb/KbArticleCard.tsx - Thẻ tóm tắt một bài viết.
•	packages/frontend-admin/src/components/kb/KbArticleModal.tsx - Modal xem chi tiết bài viết (từ kbArticleModal).
•	packages/frontend-admin/src/components/kb/KbArticleFormModal.tsx - Modal tạo/sửa bài viết (từ newArticleModal).
•	packages/frontend-admin/src/hooks/useKbSearch.ts - Hook (tùy chọn) để quản lý logic tìm kiếm (debounce, v.v.).
•	packages/backend/src/modules/kb/articles.controller.ts - (Backend) API controller cho CRUD Bài viết.
•	packages/backend/src/modules/kb/articles.service.ts - (Backend) Service chứa logic (tìm kiếm, tạo, lưu trữ).
•	packages/backend/src/modules/kb/categories.controller.ts - (Backend) API controller cho Danh mục.
•	packages/backend/src/modules/storage/storage.service.ts - (Backend) Service chung để xử lý tải file lên (ví dụ: S3).
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Task 1.0 (Backend) cần quyết định cách lưu trữ nội dung (ví dụ: Markdown). Các task dưới đây giả định lưu trữ dạng Markdown trong trường content.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-knowledge-base)
•	[ ] 1.0 (Backend) Tạo API Endpoints cho Knowledge Base (KB)
o [ ] 1.1 (Backend) Tạo kb.module.ts, articles.controller.ts, articles.service.ts.
o	[ ] 1.2 (Backend) Trong articles.service.ts, tạo hàm searchArticles(query).
o	[ ] 1.3 (Backend) Quan trọng: Implement Tìm kiếm Toàn văn (Full-Text Search) (PRD
6.0) trong searchArticles (Task 1.2) trên các trường title, tags, content.
o [ ] 1.4 (Backend) Tạo endpoint GET /kb/articles/search gọi hàm searchArticles (FR- K1).
o	[	]	1.5	(Backend)	Tạo hàm getPopularArticles() và getRecentArticles() (PRD 4.3).
o	[	]	1.6	(Backend)	Tạo endpoint	GET /kb/articles/popular và GET /kb/articles/recent.
o	[	]	1.7	(Backend)	Tạo endpoint	GET /kb/articles/:id (lấy 1 bài viết).
o	[	]	1.8	(Backend)	Tạo endpoint	POST /kb/articles (tạo bài viết mới, nhận DTO từ
newArticleModal) (FR-K11).
o [ ] 1.9 (Backend) Tạo endpoint PATCH /kb/articles/:id (cập nhật bài viết).
o [ ] 1.10 (Backend) Tạo endpoint POST /kb/articles/upload (để tải file đính kèm, sử dụng StorageService và trả về URL) (FR-K10).
•	[ ] 2.0 (Frontend) Xây dựng Trang chính Knowledge Base (Duyệt)
o	[	]	2.1	(Frontend)	Tạo KnowledgeBasePage.tsx.
o	[	]	2.2	(Frontend)	Tạo KbSearchBar.tsx (sử dụng useDebounce	để gọi API GET
/kb/articles/search khi người dùng gõ) (FR-K1).
o	[	]	2.3	(Frontend)	Tạo KbCategoryGrid.tsx (có thể	hard-code 4	danh mục) (FR-K2).
o	[	]	2.4	(Frontend)	Tạo KbArticleList.tsx.
o	[	]	2.5	(Frontend)	Trong KnowledgeBasePage.tsx,	gọi API GET /kb/articles/popular	và
.../recent (Task 1.6), truyền dữ liệu cho 2 instance của KbArticleList (FR-K3).
o [ ] 2.6 (Frontend) Quản lý trạng thái (state) searchQuery và searchResults. Khi searchResults có dữ liệu, ẩn các danh mục/list và chỉ hiển thị kết quả tìm kiếm.
o [ ] 2.7 (Frontend) Thêm nút "New Article" (FR-K5).
•	[ ] 3.0 (Frontend) Xây dựng Trình xem Bài viết (KbArticleModal)
o [ ] 3.1 (Frontend) Tạo KbArticleModal.tsx. Quản lý selectedArticleId và trạng thái isOpen.
o [ ] 3.2 (Frontend) onClick trên KbArticleCard (Task 2.5) sẽ set selectedArticleId và mở modal này (FR-K4).
o	[ ] 3.3 (Frontend) Khi modal mở, gọi GET /kb/articles/:id (Task 1.7) để lấy dữ liệu.
o	[ ] 3.4 (Frontend) Sử dụng thư viện react-markdown để render nội dung (ví dụ:
article.content) một cách an toàn (PRD 6.0, FR-K7).
o [ ] 3.5 (Frontend) Render các thành phần khác (Tiêu đề, Cảnh báo, Sơ đồ) dựa trên dữ liệu.
o [ ] 3.6 (Frontend) (Tùy chọn) Thêm nút "Edit" (Chỉnh sửa) trên modal này (chỉ hiển thị cho Admin/Senior) để mở KbArticleFormModal (Task 4.0) ở chế độ Edit.
•	[ ] 4.0 (Frontend) Xây dựng Trình tạo/sửa Bài viết (KbArticleFormModal)
o	[ ] 4.1 (Frontend) Tạo KbArticleFormModal.tsx (dựa trên newArticleModal).
o	[ ] 4.2 (Frontend) Quản lý trạng thái modal (open/closed) và editingArticleId (có thể
null).
o [ ] 4.3 (Frontend) Nút "New Article" (Task 2.7) mở modal này ở chế độ Create (editingArticleId = null).
o [ ] 4.4 (Frontend) Nút "Edit" (Task 3.6) mở modal này ở chế độ Edit (editingArticleId = article.id).
o [ ] 4.5 (Frontend) Nếu ở chế độ Edit, gọi GET /kb/articles/:id (Task 1.7) để điền (populate) dữ liệu vào form.
o [ ] 4.6 (Frontend) Xây dựng form chi tiết với tất cả các trường (Title, Category, Summary, Content (Markdown textarea), Tags, v.v.) (FR-K9).
o [ ] 4.7 (Frontend) Implement logic tải file (ví dụ: dùng react-dropzone) gọi API POST /kb/articles/upload (Task 1.10).
o [ ] 4.8 (Frontend) Khi submit, gọi POST /kb/articles (Create) hoặc PATCH /kb/articles/:id (Edit) với tất cả dữ liệu form (FR-K11).
o [ ] 4.9 (Frontend) Sau khi submit thành công, đóng modal và refetch (làm mới) các API .../popular và .../recent.
•	[ ] 5.0 (Testing) Kiểm thử Tích hợp
o [ ] 5.1 (Test) Viết unit test cho articles.service.ts (Backend) để đảm bảo Full-Text Search (Task 1.3) hoạt động chính xác.
o	[ ] 5.2 (Test) Viết E2E test (Cypress) cho KnowledgeBasePage.tsx.
o	[ ] 5.3 (Test) Test case E2E: Tải trang. Gõ "Gantry" vào thanh tìm kiếm. Xác minh
danh sách kết quả (ví dụ: "Varian TrueBeam - Gantry Motor Replacement") xuất hiện.
o [ ] 5.4 (Test) Test case E2E: Nhấp vào kết quả. Xác minh KbArticleModal mở ra và hiển thị nội dung Markdown đã được render.
o [ ] 5.5 (Test) Test case E2E: Nhấp "New Article". Điền vào form, bao gồm nội dung Markdown (ví dụ: # Test Step 1). Lưu bài viết.
o [ ] 5.6 (Test) Test case E2E: Xác minh bài viết mới xuất hiện trong danh sách "Recently Updated". 
Relevant Files
•	packages/frontend-admin/src/components/layout/Header.tsx - (Sửa đổi) Thêm component NotificationBell.
•	packages/frontend-admin/src/components/notifications/NotificationBell.tsx - (Mới) Component chuông và bộ đếm.
•	packages/frontend-admin/src/components/notifications/NotificationPanel.tsx - (Mới) Component panel (dựa trên notificationPanel).
•	packages/frontend-admin/src/components/notifications/NotificationItem.tsx - (Mới) Component cho một mục thông báo (bao gồm các nút hành động).
•	packages/frontend-admin/src/stores/notification.store.ts - (Mới) Store (Zustand) để quản lý kết nối WebSocket, danh sách notifications, và unreadCount.
•	packages/backend/src/modules/notifications/notifications.module.ts - (Mới)
•	packages/backend/src/modules/notifications/notifications.gateway.ts - (Mới) Logic WebSocket (Socket.io) (PRD 4.1).
•	packages/backend/src/modules/notifications/notifications.service.ts - (Mới) Service để tạo và lưu thông báo vào CSDL, và phát (emit) chúng qua Gateway.
•	packages/backend/src/modules/notifications/notifications.controller.ts - (Mới) API controller cho GET /notifications (lấy lịch sử) và POST /notifications/mark-read.
•	packages/backend/src/modules/tickets/tickets.service.ts - (Sửa đổi) Cần inject (tiêm) NotificationsService để gọi emit (PRD 4.2).
•	packages/backend/src/modules/billing/billing.service.ts - (Sửa đổi) Cần inject NotificationsService để gọi emit (PRD 4.2).
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Task 1.0 (Backend) và Task 2.0 (Frontend Store) là nền tảng cho toàn bộ tính năng này.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-notifications)
•	[ ] 1.0 (Backend) Thiết lập Nền tảng WebSocket và Service
o [ ] 1.1 (Backend) Cài đặt các gói NestJS WebSocket (ví dụ: @nestjs/websockets, @nestjs/platform-socket.io).
o	[	]	1.2	(Backend)	Tạo notifications.module.ts.
o	[	]	1.3	(Backend)	Tạo NotificationsGateway (notifications.gateway.ts) (PRD 4.1).
o	[	]	1.4	(Backend)	Implement logic handleConnection trong Gateway, xác thực JWT,
và cho người dùng tham gia (join) một phòng (room) theo userId (ví dụ: socket.join(user.id)) (PRD 4.1).
o	[ ] 1.5 (Backend) Tạo notifications.service.ts.
o	[ ] 1.6 (Backend) Trong NotificationsService, tạo hàm createAndEmit(userId,
payload).
o [ ] 1.7 (Backend) Hàm createAndEmit phải (1) lưu thông báo vào CSDL (với isRead: false) và (2) gọi Gateway (ví dụ: this.server.to(userId).emit('newNotification', ...)) (PRD 4.2).
o	[ ] 1.8 (Backend)	Tạo	notifications.controller.ts.
o	[ ] 1.9 (Backend)	Tạo	endpoint GET /notifications	(lấy	lịch	sử thông báo khi tải trang).
o [ ] 1.10 (Backend) Tạo endpoint POST /notifications/mark-all-read (đặt isRead: true cho tất cả thông báo của userId) (PRD 4.3).
•	[ ] 2.0 (Frontend) Thiết lập Notification Store và Kết nối WebSocket
o	[	]	2.1 (Frontend)	Cài đặt socket.io-client.
o	[	]	2.2 (Frontend)	Tạo notification.store.ts (ví dụ: Zustand) (PRD 6.0).
o	[	]	2.3 (Frontend)	Store phải quản lý notifications: INotification[] và unreadCount:
number.
o [ ] 2.4 (Frontend) Trong store (hoặc App.tsx), tạo một hàm initSocket() (gọi 1 lần khi đăng nhập).
o	[ ] 2.5 (Frontend) initSocket phải kết nối đến WebSocket Gateway (Task 1.4) với JWT.
o	[ ] 2.6 (Frontend) initSocket phải lắng nghe (listen) sự kiện
socket.on('newNotification', ...) (PRD 4.4).
o [ ] 2.7 (Frontend) Khi nhận newNotification, store phải thêm thông báo mới vào đầu mảng notifications và unreadCount++ (PRD 4.4).
o [ ] 2.8 (Frontend) initSocket cũng phải gọi API GET /notifications (Task 1.9) để tải lịch sử và unreadCount ban đầu.
•	[ ] 3.0 (Frontend) Xây dựng Giao diện (UI) Bảng Thông báo
o [ ] 3.1 (Frontend) Tạo NotificationBell.tsx. Component này đọc unreadCount từ store (Task 2.3) và hiển thị huy hiệu (notificationBadge) (PRD 4.3).
o [ ] 3.2 (Frontend) Nhấp vào NotificationBell (Task 3.1) sẽ mở NotificationPanel.tsx (PRD 4.3).
o [ ] 3.3 (Frontend) Tạo NotificationPanel.tsx. Component này đọc mảng notifications từ store (Task 2.3).
o [ ] 3.4 (Frontend) Implement các tab (All, Urgent, Jobs, System) và logic lọc (filter) (dựa trên notification.category) (PRD 4.3).
o [ ] 3.5 (Frontend) Tạo NotificationItem.tsx. Component này nhận notification làm prop (PRD 4.3).
o [ ] 3.6 (Frontend) Trong NotificationItem.tsx, implement logic render Nút Hành động
(Action Buttons) (PRD 4.3) dựa trên notification.actionPayload (ví dụ: nếu actionPayload.action === 'OPEN_TICKET', render nút "View Ticket").
o [ ] 3.7 (Frontend) Nút "Mark all as read" (Task 3.3) phải gọi API POST /notifications/mark-all-read (Task 1.10) và reset unreadCount trong store (PRD 4.3).
•	[ ] 4.0 (Backend) Tích hợp Trình phát Thông báo (Emitter)
o	[ ] 4.1 (Backend) Inject (Tiêm) NotificationsService (Task 1.5) vào TicketsService.
o	[ ] 4.2 (Backend) Sửa đổi hàm createTicket (trong TicketsService): nếu priority ===
'HIGH', gọi this.notificationService.createAndEmit(adminUserId, { ...payload... }) (PRD 4.2).
o	[ ] 4.3 (Backend) Inject NotificationsService vào BillingService.
o	[ ] 4.4 (Backend) Sửa đổi JobsService (hoặc TicketsService): khi một công việc
chuyển sang READY_FOR_INVOICING, gọi this.notificationService.createAndEmit(accountingUserId, { action: 'GENERATE_INVOICE', jobId: ... }) (PRD 4.4).
o [ ] 4.5 (Backend) Thêm các lệnh gọi createAndEmit khác cho các sự kiện quan trọng (ví dụ: "Quote Approved", "Payment Overdue").
•	[ ] 5.0 (Testing) Kiểm thử Tích hợp E2E
o [ ] 5.1 (Test) Viết unit test cho notifications.service.ts (Backend) (sử dụng mock Gateway) để đảm bảo createAndEmit lưu vào CSDL và gọi emit chính xác.
o	[	]	5.2	(Test)	Viết E2E test (Cypress)	(nếu có thể test WebSocket).
o	[	]	5.3	(Test)	Test case	E2E:	(User	A	-	Admin) Đăng nhập. Bộ đếm thông báo là	0.
o	[	]	5.4	(Test)	Test case	E2E:	(User	B	-	Customer) (Giả lập) Tạo một ticket "Urgent".
o	[	]	5.5	(Test)	Test case	E2E:	(User	A	-	Admin) Xác minh (trong vòng 3 giây) bộ	đếm
thông báo (Task 3.1) tự động cập nhật thành 1 (PRD 4.4).
o [ ] 5.6 (Test) Test case E2E: (User A) Mở panel. Xác minh thông báo "Urgent" mới xuất hiện ở đầu danh sách (PRD 4.4).
o [ ] 5.7 (Test) Test case E2E: (User A) Nhấp "Mark all as read". Xác minh bộ đếm reset về 0 (PRD 4.3). 
Relevant Files
•	packages/frontend-admin/src/pages/ReportsPage.tsx - Component trang chính cho mô- đun Báo cáo.
•	packages/frontend-admin/src/components/reports/ReportsFilterBar.tsx - Component chứa bộ lọc Date Range và các nút Export.
•	packages/frontend-admin/src/components/reports/KpiCardGrid.tsx - Component chứa 3 thẻ KPI.
•	packages/frontend-admin/src/components/reports/ChartComponent.tsx - Component biểu đồ có thể tái sử dụng (dùng cho 4 biểu đồ).
•	packages/frontend-admin/src/components/reports/TechnicianPerformanceTable.tsx - Component bảng (table) cho hiệu suất kỹ thuật viên.
•	packages/frontend-admin/src/components/reports/HospitalVolumeTable.tsx - Component bảng (table) cho khối lượng bệnh viện.
•	packages/frontend-admin/src/stores/reports-filter.store.ts - Store (Zustand/Context) để quản lý dateRange chung.
•	packages/backend/src/modules/reports/reports.controller.ts - (Backend) API controller, cung cấp nhiều endpoint (ví dụ: GET /reports/kpi, GET /reports/tickets-by-status, GET /reports/technician-performance).
•	packages/backend/src/modules/reports/reports.service.ts - (Backend) Service chứa các logic truy vấn (query) SQL/ORM phức tạp để tổng hợp dữ liệu.
•	packages/backend/src/modules/reports/reports.utils.ts - (Backend) (Tùy chọn) Các hàm tiện ích để tạo file PDF/Excel.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Việc tối ưu hóa truy vấn CSDL (Task 1.0) là rất quan trọng cho hiệu suất của trang này.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-reports)
•	[ ] 1.0 (Backend) Tạo API Endpoints cho Báo cáo
o [ ] 1.1 (Backend) Tạo reports.module.ts, reports.controller.ts, reports.service.ts.
o [ ] 1.2 (Backend) Trong reports.service.ts, tạo hàm getKpiSummary(dateRange). (PRD
4.2)
o [ ] 1.3 (Backend) Trong reports.controller.ts, tạo endpoint GET /reports/kpi (chấp nhận startDate, endDate).
o [ ] 1.4 (Backend) Trong reports.service.ts, tạo hàm getTicketsByStatus(dateRange) (dùng cho Pie Chart). (PRD 4.3)
o [ ] 1.5 (Backend) Trong reports.controller.ts, tạo endpoint GET /reports/tickets-by- status.
o [ ] 1.6 (Backend) Trong reports.service.ts, tạo 3 hàm riêng biệt cho 3 biểu đồ/bảng còn lại: getMonthlyTicketVolume, getTechnicianPerformance, getHospitalVolume.
o [ ] 1.7 (Backend) (Tùy chọn, để tối ưu) Cân nhắc gộp tất cả các hàm trên vào một endpoint duy nhất GET /reports/summary?startDate=...&endDate=... để giảm số lượng cuộc gọi mạng.
o [ ] 1.8 (Backend) Trong reports.controller.ts, tạo endpoint GET /reports/export (chấp nhận format='pdf'/'excel').
o [ ] 1.9 (Backend) Trong reports.service.ts, tạo hàm exportReport(dateRange, format) gọi các hàm tổng hợp dữ liệu (Task 1.6) và sử dụng thư viện (ví dụ: pdf-lib, exceljs) để tạo file. (PRD 4.1)
•	[ ] 2.0 (Frontend) Xây dựng Cấu trúc Trang Reports và State Quản lý
o	[ ] 2.1 (Frontend) Tạo file ReportsPage.tsx.
o	[ ] 2.2 (Frontend) Tạo store reports-filter.store.ts (Zustand/Context) để quản lý
dateRange (mặc định "This Month") (PRD 7.0).
o [ ] 2.3 (Frontend) Tạo ReportsFilterBar.tsx. Component này sẽ cập nhật dateRange trong store.
o [ ] 2.4 (Frontend) Kết nối các nút "Export PDF" / "Export Excel" để gọi API GET /reports/export (Task 1.8) với dateRange hiện tại từ store.
o [ ] 2.5 (Frontend) Thiết lập layout (ví dụ: CSS Grid) trong ReportsPage.tsx để chứa 3 KPI, lưới 2x2 cho biểu đồ, và 2 bảng.
•	[ ] 3.0 (Frontend) Xây dựng các Component Biểu đồ và KPI
o [ ] 3.1 (Frontend) Tạo KpiCardGrid.tsx. Component này đọc dateRange từ store và gọi API GET /reports/kpi (Task 1.3).
o	[	]	3.2	(Frontend)	Hiển thị 3 thẻ KPI với dữ liệu (hoặc loading)	từ API.
o	[	]	3.3	(Frontend)	Cài đặt thư viện biểu đồ (ví dụ: recharts).
o	[	]	3.4	(Frontend)	Tạo ChartComponent.tsx. Component này	nhận một	endpoint (ví
dụ: /reports/tickets-by-status) và type (ví dụ: 'pie', 'bar') làm props.
o [ ] 3.5 (Frontend) ChartComponent tự động đọc dateRange từ store, gọi API (dùng endpoint prop) và render biểu đồ tương ứng (dùng type prop).
o [ ] 3.6 (Frontend) Trong ReportsPage.tsx, render 4 instance của ChartComponent với các endpoint và type chính xác (PRD 4.3).
•	[ ] 4.0 (Frontend) Xây dựng các Bảng Dữ liệu (Data Tables)
o [ ] 4.1 (Frontend) Tạo TechnicianPerformanceTable.tsx. Component này đọc dateRange từ store và gọi API GET /reports/technician-performance (Task 1.6).
o [ ] 4.2 (Frontend) Render bảng (table) hiển thị dữ liệu hiệu suất kỹ thuật viên (PRD 4.4).
o [ ] 4.3 (Frontend) Tạo HospitalVolumeTable.tsx. Component này đọc dateRange từ store và gọi API GET /reports/hospital-volume (Task 1.6).
o [ ] 4.4 (Frontend) Render bảng (table) hiển thị dữ liệu khối lượng bệnh viện (PRD 4.4).
•	[ ] 5.0 (Testing) Kiểm thử Tích hợp
o [ ] 5.1 (Test) Viết unit test cho reports.service.ts (Backend) để đảm bảo các phép tính tổng hợp (aggregation) (AVG, COUNT, SUM) trả về kết quả chính xác.
o [ ] 5.2 (Test) Viết E2E test (Cypress) cho ReportsPage.tsx.
o [ ] 5.3 (Test) Test case E2E: Tải trang. Xác minh 3 KPI, 4 biểu đồ, và 2 bảng đều hiển thị (có thể là trạng thái loading ban đầu).
o [ ] 5.4 (Test) Test case E2E: Thay đổi dateRange (ví dụ: "Last 7 Days"). Xác minh rằng
6 component dữ liệu đều kích hoạt gọi API (refetch) và cập nhật dữ liệu mới.
o [ ] 5.5 (Test) Test case E2E: Nhấp vào nút "Export PDF". Xác minh một file PDF được tải xuống. 
Relevant Files
•	packages/frontend-admin/src/pages/SchedulePage.tsx - Component trang chính cho mô-đun Lịch trình.
•	packages/frontend-admin/src/components/schedule/WeeklyCalendarGrid.tsx - Component hiển thị lưới lịch 7 ngày và các sự kiện.
•	packages/frontend-admin/src/components/schedule/TechnicianStatusList.tsx - Component hiển thị danh sách các thẻ trạng thái Kỹ thuật viên (bên phải).
•	packages/frontend-admin/src/components/schedule/ScheduleFilterBar.tsx - Component chứa các bộ lọc (Date Range, By Technician).
•	packages/frontend-admin/src/components/schedule/ScheduleJobModal.tsx - Modal chi tiết để Tạo/Sửa một công việc (dựa trên modal trong wireframe).
•	packages/frontend-admin/src/stores/schedule-filter.store.ts - Store (Zustand/Context) để quản lý trạng thái lọc (selectedTechnicianId, selectedDateRange).
•	packages/backend/src/modules/schedule/schedule.controller.ts - (Backend) API controller cho GET /schedule/jobs và CRUD cho Jobs.
•	packages/backend/src/modules/schedule/schedule.service.ts - (Backend) Service chứa logic nghiệp vụ (lọc công việc, kiểm tra xung đột).
•	packages/backend/src/modules/technicians/technicians.controller.ts - (Backend) API controller cho GET /technicians/status.
•	packages/backend/src/modules/technicians/technicians.service.ts - (Backend) Service để lấy trạng thái kỹ thuật viên.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Chức năng lọc (Task 2.0 và 3.0) là cốt lõi, vì nó điều khiển cả hai component chính (Lịch
và Danh sách) theo Lựa chọn B.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-schedule)
•	[ ] 1.0 (Backend) Tạo API Endpoints cho Lịch trình và Kỹ thuật viên
o [ ] 1.1 (Backend) Tạo schedule.module.ts, schedule.controller.ts, schedule.service.ts.
o [ ] 1.2 (Backend) Trong schedule.service.ts, tạo hàm getScheduledJobs(filterDto).
o [ ] 1.3 (Backend) Đảm bảo getScheduledJobs chấp nhận các tham số: startDate, endDate, và (tùy chọn) technicianId (PRD 7.0).
o [ ] 1.4 (Backend) Trong schedule.controller.ts, tạo endpoint GET /schedule/jobs gọi hàm getScheduledJobs.
o [ ] 1.5 (Backend) Trong schedule.service.ts, tạo hàm createJob(createJobDto). Hàm này phải chứa logic kiểm tra xung đột lịch (conflict checking) phía máy chủ (PRD 7.0).
o [ ] 1.6 (Backend) Trong schedule.controller.ts, tạo endpoint POST /schedule/jobs gọi hàm createJob.
o [ ] 1.7 (Backend) Trong schedule.service.ts, tạo hàm updateJob(id, updateJobDto) (cũng phải kiểm tra xung đột).
o [ ] 1.8 (Backend) Trong schedule.controller.ts, tạo endpoint PATCH /schedule/jobs/:id gọi hàm updateJob.
o [ ] 1.9 (Backend) Trong schedule.controller.ts, tạo endpoint GET /schedule/jobs/:id để lấy chi tiết một công việc (dùng cho modal edit).
o [ ] 1.10 (Backend) Tạo technicians.module.ts, technicians.controller.ts, technicians.service.ts.
o [ ] 1.11 (Backend) Trong technicians.service.ts, tạo hàm getTechnicianStatus(technicianId).
o [ ] 1.12 (Backend) Trong technicians.controller.ts, tạo endpoint GET /technicians/status chấp nhận technicianId tùy chọn (PRD 7.0). Nếu technicianId rỗng, trả về tất cả.
•	[ ] 2.0 (Frontend) Xây dựng Cấu trúc Trang Schedule và State Quản lý
o [ ] 2.1 (Frontend) Tạo file SchedulePage.tsx.
o	[ ] 2.2 (Frontend) Implement layout 2 cột (ví dụ: grid-cols-[2fr_1fr]).
o	[ ] 2.3 (Frontend) Tạo store schedule-filter.store.ts (ví dụ: Zustand) để quản lý
selectedTechnicianId (mặc định null) và selectedDateRange (mặc định tuần này) (PRD 7.0).
o [ ] 2.4 (Frontend) Tạo component ScheduleFilterBar.tsx.
o [ ] 2.5 (Frontend) Trong ScheduleFilterBar, gọi API GET /users?role=TECHNICIAN để điền vào dropdown "By Technician".
o [ ] 2.6 (Frontend) Dropdown "By Technician" phải có tùy chọn "All Technicians" (giá trị null) (PRD 4.4).
o [ ] 2.7 (Frontend) Khi thay đổi bộ lọc, gọi các hàm setter (ví dụ: setSelectedTechnicianId) từ store (PRD 7.0).
•	[ ] 3.0 (Frontend) Xây dựng Component Lịch hàng tuần (WeeklyCalendarGrid)
o [ ] 3.1 (Frontend) Tạo component WeeklyCalendarGrid.tsx.
o [ ] 3.2 (Frontend) Component này phải đọc (subscribe) selectedTechnicianId và selectedDateRange từ store (PRD 7.0).
o [ ] 3.3 (Frontend) Sử dụng useQuery (ví dụ: React Query) để gọi API GET /schedule/jobs.
o [ ] 3.4 (Frontend) Truyền selectedTechnicianld và selectedDateRange từ store vào useQuery key (để nó tự động refetch khi store thay đổi) (PRD 7.0).
o	[	]	3.5	(Frontend)	Render lưới lịch (grid) 7 ngày và các khối thời gian.
o	[	]	3.6	(Frontend)	Map dữ liệu (jobs) từ API vào các ô (cell) chính xác trên	lưới.
o	[	]	3.7	(Frontend)	Thêm onClick vào mỗi sự kiện (event), gọi hàm (ví dụ:
openEditJobModal) và truyền job.id (PRD 4.2).
•	[ ] 4.0 (Frontend) Xây dựng Component Danh sách Kỹ thuật viên (TechnicianStatusList)
o	[	]	4.1	(Frontend)	Tạo component TechnicianStatusList.tsx.
o	[	]	4.2	(Frontend)	Component này phải đọc (subscribe) selectedTechnicianId	từ
store (PRD 7.0).
o	[	]	4.3	(Frontend)	Sử dụng useQuery để gọi API GET /technicians/status.
o	[	]	4.4	(Frontend)	Truyền selectedTechnicianId từ store vào useQuery key	(để	nó tự
động refetch) (PRD 7.0).
o [ ] 4.5 (Frontend) Render danh sách các thẻ TechCard (hoặc một thẻ duy nhất nếu selectedTechnicianId được set) (PRD 4.3).
•	[ ] 5.0 (Frontend) Tích hợp Modal "Schedule Job" (Tạo/Sửa)
o	[ ] 5.1 (Frontend) Tạo component ScheduleJobModal.tsx dựa trên wireframe.
o	[ ] 5.2 (Frontend) Quản lý trạng thái modal (open/closed) và editingJobId (có thể là
null) trong SchedulePage.tsx hoặc store.
o [ ] 5.3 (Frontend) Nút "Schedule Job" (trên header) set editingJobId thành null và mở modal (chế độ Create).
o [ ] 5.4 (Frontend) onClick từ Task 3.7 set editingJobId thành job.id và mở modal (chế độ Edit).
o [ ] 5.5 (Frontend) Khi modal mở ở chế độ "Edit", gọi API GET /schedule/jobs/:id (Task
1.9)	để điền dữ liệu vào form.
o [ ] 5.6 (Frontend) Implement logic đầy đủ của modal (chọn Khách hàng -> load Thiết bị, chọn Kỹ thuật viên, chọn Ngày/Giờ).
o	[ ] 5.7 (Frontend) Implement nút "Check Availability" (gọi API kiểm tra xung đột).
o	[ ] 5.8 (Frontend) Khi submit, gọi POST /schedule/jobs (Create) hoặc PATCH
/schedule/jobs/:id (Edit) (Task 1.5, 1.7).
o [ ] 5.9 (Frontend) Sau khi submit thành công, đóng modal và gọi refetch (làm mới) cho cả GET /schedule/jobs và GET /technicians/status.
•	[ ] 6.0 (Testing) Kiểm thử Tích hợp và Lọc
o [ ] 6.1 (Test) Viết unit test cho schedule.service.ts (Backend) để đảm bảo logic kiểm tra xung đột (conflict checking) hoạt động chính xác.
o	[	]	6.2	(Test)	Viết E2E test (Cypress) cho SchedulePage.tsx.
o	[	]	6.3	(Test)	Test case	E2E:	Tải trang. Xác minh Lịch (Grid) hiển thị nhiều	sự kiện và
Danh sách Kỹ thuật viên (List) hiển thị nhiều kỹ thuật viên.
o	[	]	6.4	(Test)	Test case	E2E:	Chọn "Nguyen Van A" từ dropdown "By Technician".
o	[	]	6.5	(Test)	Test case	E2E:	Xác minh Lịch (Grid) chỉ hiển thị các sự kiện	của
"Nguyen Van A".
○	[ ] 6.6 (Test) Test case E2E: Xác minh Danh sách Kỹ thuật viên (List) bây giờ chỉ hiển
thị thẻ của "Nguyen Van A" (PRD 4.0).
○	[ ] 6.7 (Test) Test case E2E: Chọn "All Technicians" từ dropdown. Xác minh cả Lịch và
Danh sách quay lại trạng thái ban đầu.
○	[ ] 6.8 (Test) Test case E2E: Mở modal "Schedule Job", điền thông tin, và tạo một
công việc mới. Xác minh sự kiện mới xuất hiện trên lịch. 
Relevant Files
•	packages/frontend-admin/src/pages/SettingsPage.tsx - (Mới) Component trang chính cho mô-đun Cài đặt (chứa 2 tab).
•	packages/frontend-admin/src/components/settings/UserManagementTab.tsx - (Mới) Component cho tab Quản lý Người dùng (bảng, nút mời).
•	packages/frontend-admin/src/components/settings/InviteUserModal.tsx - (Mới) Modal để mời người dùng mới (Email, Role).
•	packages/frontend-admin/src/components/settings/SystemSettingsTab.tsx - (Mới) Component cho tab Cài đặt Hệ thống (form thông tin công ty).
•	packages/backend/src/modules/users/users.controller.ts - (Mới hoặc Sửa đổi) API controller cho CRUD Người dùng (Admin).
•	packages/backend/src/modules/users/users.service.ts - (Mới hoặc Sửa đổi) Service cho Người dùng.
•	packages/backend/src/modules/auth/guards/admin.guard.ts - (Mới) Lớp bảo vệ (Guard) @Roles('ADMIN').
•	packages/backend/src/modules/settings/settings.controller.ts - (Mới) API controller cho GET /settings và PATCH /settings.
•	packages/backend/src/modules/settings/settings.service.ts - (Mới) Service để quản lý cài đặt hệ thống.
•	packages/backend/src/modules/billing/invoices.service.ts - (Sửa đổi) Cần inject SettingsService để lấy thông tin công ty khi tạo PDF hóa đơn.
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Bảo mật (Task 1.0) là cực kỳ quan trọng cho mô-đun này.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/admin-settings)
•	[ ] 1.0 (Backend) Thiết lập Bảo mật (RBAC) và Mô-đun Người dùng
o [ ] 1.1 (Backend) Đảm bảo User model/schema có trường role (enum: 'ADMIN', 'TECHNICIAN', 'ACCOUNTANT') và status (enum: 'ACTIVE', 'INACTIVE').
o [ ] 1.2 (Backend) Tạo AdminGuard (admin.guard.ts) kiểm tra request.user.role ===
'ADMIN' (PRD 4.1).
o [ ] 1.3 (Backend) Tạo users.controller.ts (ví dụ: GET /users, PATCH /users/:id/status, PATCH /users/:id/role) và bảo vệ tất cả bằng @UseGuards(AdminGuard) (PRD 4.1, 4.2).
o	[ ] 1.4 (Backend) Tạo users.service.ts với logic cho các hàm (Task 1.3).
o	[ ] 1.5 (Backend) Tạo endpoint POST /users/invite (được bảo vệ bởi AdminGuard)
(PRD 4.3).
o [ ] 1.6 (Backend) Logic invite (Task 1.5) phải tạo token mời, lưu vào CSDL, và gửi email (PRD 4.5).
o [ ] 1.7 (Backend) Sửa đổi endpoint POST /auth/register (hoặc tạo endpoint mới POST /auth/complete-invitation) để chấp nhận token mời (thay vì email/pass tự do).
•	[ ] 2.0 (Backend) Tạo API Endpoints cho Cài đặt Hệ thống
o	[	]	2.1	(Backend)	Tạo	settings.module.ts, settings.controller.ts, settings.service.ts.
o	[	]	2.2	(Backend)	Tạo	bảng SystemSettings (singleton - chỉ 1 hàng) (PRD 4.10).
o	[	]	2.3	(Backend)	Tạo	endpoint GET /settings (lấy cài đặt) (PRD 4.7).
o	[	]	2.4	(Backend)	Tạo	endpoint PATCH /settings (cập nhật cài đặt, bao gồm
companyLogoUrl) (PRD 4.7).
o [ ] 2.5 (Backend) Tích hợp StorageService (từ KB Epic) để xử lý việc tải lên logo (PRD 4.9).
o [ ] 2.6 (Backend) Sửa đổi InvoicesService (từ Billing Epic): inject SettingsService, gọi getSettings() (Task 2.3), và chèn dữ liệu công ty vào PDF hóa đơn (PRD 4.11).
•	[ ] 3.0 (Frontend) Xây dựng Trang Cài đặt (Settings Page)
o [ ] 3.1 (Frontend) Tạo SettingsPage.tsx. Bảo vệ route (đường dẫn) này chỉ dành cho vai trò ADMIN.
o [ ] 3.2 (Frontend) Tạo cấu trúc 2 tab: "User Management" và "System Settings".
•	[ ] 4.0 (Frontend) Tích hợp Tab Quản lý Người dùng
o	[ ] 4.1 (Frontend) Tạo UserManagementTab.tsx.
o	[ ] 4.2 (Frontend) Gọi API GET /users (Task 1.3) và render bảng (table) người dùng
(PRD 4.2).
o [ ] 4.3 (Frontend) Thêm các hành động (ví dụ: nút bấm) trên bảng để thay đổi Trạng thái/Vai trò (gọi PATCH /users/:id/status hoặc .../role) (PRD 4.6).
o	[	]	4.4	(Frontend)	Tạo InviteUserModal.tsx (PRD 4.4).
o	[	]	4.5	(Frontend)	Nút "Invite User" (Task 4.1) mở modal (Task 4.4).
o	[	]	4.6	(Frontend)	Submit modal gọi POST /users/invite (Task 1.5).
o	[	]	4.7	(Frontend)	Sau khi mời, đóng modal và refetch (làm mới) bảng	người	dùng.
•	[ ] 5.0 (Frontend) Tích hợp Tab Cài đặt Hệ thống
o	[	]	5.1	(Frontend)	Tạo SystemSettingsTab.tsx (PRD 4.7).
o	[	]	5.2	(Frontend)	Gọi API GET /settings (Task 2.3) để điền (populate)	dữ	liệu	vào
form.
o	[ ] 5.3 (Frontend) Xây dựng form với các trường (Tên, Địa chỉ, Thuế) (PRD 4.8).
o	[ ] 5.4 (Frontend) Implement logic tải lên logo (gọi API POST /settings/upload-logo
hoặc tương tự) (PRD 4.9).
o [ ] 5.5 (Frontend) Nút "Save" gọi PATCH /settings (Task 2.4) với dữ liệu form.
•	[	]	6.0	(Testing) Kiểm thử Bảo	mật và Chức	năng
o	[	]	6.1	(Test) Viết unit test	cho admin.guard.ts	(Backend)	(PRD	4.1).
o	[	]	6.2	(Test) Viết E2E test	(Cypress).
o	[	]	6.3	(Test) Test case E2E: Đăng nhập	với tư	cách	TECHNICIAN.	Cố	gắng truy cập
/settings. Xác minh bị chuyển hướng về Dashboard (lỗi 403).
o [ ] 6.4 (Test) Test case E2E: Đăng nhập với tư cách ADMIN. Truy cập /settings. Xác minh trang tải thành công.
o [ ] 6.5 (Test) Test case E2E: Vào tab "User Management". Mời một người dùng mới (test-tech@gmail.com, Role: 'TECHNICIAN'). Xác minh người dùng mới xuất hiện trong bảng.
o [ ] 6.6 (Test) Test case E2E: Vào tab "System Settings". Thay đổi companyName thành "MedEquip Test Co." và Lưu.
o [ ] 6.7 (Test) Test case E2E: (Phức tạp) Đi đến Mô-đun Billing, tạo/xem một hóa đơn PDF. Xác minh tên "MedEquip Test Co." xuất hiện trên PDF (PRD 4.11). 
Relevant Files
•	packages/mobile-app/src/database/schema.ts - (Mới) Định nghĩa Cấu trúc (Schema) cho CSDL cục bộ (ví dụ: WatermelonDB/Realm).
•	packages/mobile-app/src/database/models/Job.ts - (Mới) Model cho bảng Jobs cục bộ.
•	packages/mobile-app/src/database/models/JobPhoto.ts - (Mới) Model cho bảng JobPhotos cục bộ (lưu file URI).
•	packages/mobile-app/src/services/SyncService.ts - (Mới) Logic cốt lõi để "pull" (kéo) và "push" (đẩy) dữ liệu.
•	packages/mobile-app/src/screens/HomeScreen.tsx - Màn hình chính (Dashboard của Tech).
•	packages/mobile-app/src/screens/JobDetailScreen.tsx - Màn hình chi tiết công việc (từ modal trong wireframe).
•	packages/mobile-app/src/components/JobCard.tsx - Component thẻ (card) công việc.
•	packages/mobile-app/src/components/SignaturePad.tsx - Component lấy chữ ký (ví dụ: react-native-signature-canvas).
•	packages/mobile-app/src/components/CameraManager.tsx - Component xử lý chụp ảnh (ví dụ: react-native-vision-camera).
•	packages/backend/src/modules/sync/sync.controller.ts - (Mới) API controller (Backend) cho GET /sync/pull và POST /sync/push.
•	packages/backend/src/modules/sync/sync.service.ts - (Mới) Service (Backend) xử lý logic đồng bộ (pull/push) hàng loạt (batch).
Notes
•	Các task dưới đây đã được chia nhỏ chi tiết (Giai đoạn 2).
•	Đây là kiến trúc Offline-First (PRD 4.1). Mọi component UI (Task 3.0, 4.0) đều đọc/ghi vào CSDL cục bộ (Local DB), không gọi API trực tiếp.
Instructions for Completing Tasks
IMPORTANT: As you complete each task, you must check it off in this markdown file by changing - [ ] to - [x].
Tasks
•	[ ] 0.0 Create feature branch
o [ ] 0.1 Tạo và checkout một nhánh mới cho tính năng này (ví dụ: git checkout -b feature/mobile-app-offline)
•	[ ] 1.0 (Mobile) Thiết lập Nền tảng Offline-First
o [ ] 1.1 (Mobile) Cài đặt và cấu hình thư viện CSDL cục bộ (ví dụ: WatermelonDB hoặc Realm).
o [ ] 1.2 (Mobile) Định nghĩa CSDL schema (schema.ts) dựa trên PRD 6.0 (ví dụ: bảng jobs, job_notes, job_photos, job_signatures).
o [ ] 1.3 (Mobile) Tạo các file Model (ví dụ: Job.ts, JobPhoto.ts) cho CSDL cục bộ.
•	[ ] 2.0 (Mobile) Xây dựng Dịch vụ Đồng bộ (SyncService)
o	[ ] 2.1 (Mobile) Tạo file SyncService.ts.
o	[ ] 2.2 (Mobile) Tạo hàm pullChanges(). Hàm này gọi GET /sync/pull?lastSync=...
(Task 5.2).
o [ ] 2.3 (Mobile) Khi nhận dữ liệu (pull), hàm này phải ghi (create/update) hàng loạt (batch) vào CSDL cục bộ.
o [ ] 2.4 (Mobile) Tạo hàm pushChanges(). Hàm này tìm tất cả các bản ghi cục bộ có _status = 'created'/'updated'/'deleted'.
o [ ] 2.5 (Mobile) Hàm này phải gửi (POST) các thay đổi này (bao gồm cả file ảnh/chữ ký) lên endpoint POST /sync/push (Task 5.4).
o [ ] 2.6 (Mobile) Sau khi push thành công, hàm này phải dọn dẹp (clean up) CSDL cục bộ (ví dụ: xóa các bản ghi đã deleted, cập nhật _status).
o [ ] 2.7 (Mobile) Kích hoạt pullChanges() và pushChanges() tự động khi khởi động ứng dụng và khi phát hiện có kết nối mạng.
•	[ ] 3.0 (Mobile) Xây dựng Màn hình Chính (HomeScreen)
o	[ ] 3.1 (Mobile) Tạo HomeScreen.tsx (dựa trên mobile-view).
o	[ ] 3.2 (Mobile) Truy vấn (Query) CSDL cục bộ (ví dụ:
database.collections.get('jobs').query(...)) để lấy "Current Job" và "Next Jobs" (PRD 4.1).
o [ ] 3.3 (Mobile) Đảm bảo HomeScreen "phản ứng" (reactive) với các thay đổi của CSDL cục bộ (tự động cập nhật khi SyncService chạy).
o [ ] 3.4 (Frontend) Tạo các Nút Hành động Nhanh (Quick Actions) (Photo, Check-in, Parts, Call) (PRD 4.3).
•	[ ] 4.0 (Mobile) Xây dựng Màn hình Chi tiết Công việc (JobDetailScreen)
o	[ ] 4.1 (Mobile) Tạo JobDetailScreen.tsx (dựa trên mobile-detail-modal).
o	[ ] 4.2 (Mobile) Màn hình này nhận jobId làm prop và truy vấn (query) CSDL cục bộ để
lấy chi tiết 1 công việc.
o [ ] 4.3 (Mobile) Xây dựng component CameraManager.tsx (ví dụ: dùng react-native- vision-camera).
o [ ] 4.4 (Mobile) Khi chụp ảnh, phải lưu ảnh vào thư mục của ứng dụng (lấy file URI) và tạo một bản ghi JobPhoto mới trong CSDL cục bộ (PRD 6.0).
o [ ] 4.5 (Mobile) Xây dựng component SignaturePad.tsx (ví dụ: dùng react-native- signature-canvas).
o [ ] 4.6 (Mobile) Khi lấy chữ ký, phải lưu (dạng base64/file URI) và tạo/cập nhật bản ghi JobSignature trong CSDL cục bộ (PRD 6.0).
o [ ] 4.7 (Mobile) Xây dựng chức năng "Work Notes" và "Parts Used", đảm bảo chúng ghi (Write) vào các bảng CSDL cục bộ (PRD 4.1).
o [ ] 4.8 (Mobile) Nút "Complete Job" phải cập nhật trạng thái của Job trong CSDL cục
bộ (ví dụ: job.status = 'COMPLETED', job._status = 'updated') (PRD 4.3).
•	[ ] 5.0 (Backend) Tạo API Endpoints cho Đồng bộ (Sync)
o	[ ] 5.1 (Backend) Tạo sync.module.ts, sync.controller.ts, sync.service.ts.
o	[ ] 5.2 (Backend) Tạo endpoint GET /sync/pull chấp nhận lastSyncTimestamp (PRD
6.0).
o [ ] 5.3 (Backend) Tạo endpoint POST /sync/push chấp nhận một payload (gói) lớn chứa nhiều thay đổi (creates/updates/deletes) từ thiết bị (PRD 6.0).
o [ ] 5.4 (Backend) Logic pushChanges phải xử lý việc tải lên file (ảnh/chữ ký) từ payload (ví dụ: base64) và lưu chúng vào S3/Cloud Storage, sau đó lưu URL vào CSDL chính.
o [ ] 5.5 (Backend) Logic pushChanges phải xử lý các thay đổi theo thứ tự và xử lý xung đột (PRD 4.2).
•	[ ] 6.0 (Testing) Kiểm thử Chế độ Offline
o	[ ] 6.1 (Test) Viết unit test cho SyncService.ts (Mobile) (có thể dùng mock).
o	[ ] 6.2 (Test) Viết unit test cho sync.service.ts (Backend) để đảm bảo xử lý batch
(hàng loạt) chính xác.
o [ ] 6.3 (Test) Test case E2E: (Giả lập) Mở ứng dụng (có mạng). Xác minh công việc A được tải về.
o	[ ] 6.4 (Test) Test case E2E: (Giả lập) Tắt mạng (Airplane Mode).
o	[ ] 6.5 (Test) Test case E2E: Mở công việc A. Thêm ghi chú, chụp 2 ảnh, lấy chữ ký, và
nhấn "Complete Job".
o [ ] 6.6 (Test) Test case E2E: Quay lại HomeScreen. Xác minh công việc A hiển thị là "Hoàn thành (Đang chờ đồng bộ)".
o	[ ] 6.7 (Test) Test case E2E: (Giả lập) Bật mạng.
o	[ ] 6.8 (Test) Test case E2E: Đợi 30 giây. Xác minh trạng thái công việc A chuyển
thành "Đã đồng bộ" (Synced).
o [ ] 6.9 (Test) Test case E2E: (Backend) Kiểm tra CSDL máy chủ và S3. Xác minh ghi chú, 2 ảnh, chữ ký và trạng thái "Completed" đã được lưu chính xác.
