let tickets = [
  { pnr: "VN101", name: "Nguyen Van A", type: "ECONOMY", status: "BOOKED", baggage: 0, fee: 0, seat: "12A" },
  { pnr: "VN102", name: "Tran Thi B", type: "BUSINESS", status: "BOOKED", baggage: 0, fee: 0, seat: "02B" },
  { pnr: "VN103", name: "Le Minh C", type: "ECONOMY", status: "CHECKED_IN", baggage: 18, fee: 0, seat: "15C" },
  { pnr: "VN104", name: "Pham Hoang D", type: "BUSINESS", status: "CANCELLED", baggage: 0, fee: 0, seat: "01A" }
];

function findTicketByPnr(pnr) {
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].pnr.toLowerCase() === pnr.toLowerCase()) {
      return tickets[i];
    }
  }
  return null;
}

function calculateExcessBaggageFee(type, weight) {
  let limit = 20; 
  if (type === "BUSINESS") {
    limit = 30;  
  }

  let overWeight = weight - limit;
  if (overWeight > 0) {
    return overWeight * 50000; 
  }
  return 0;
}

function displayBoardingPass(ticket) {
  console.log("----- THẺ LÊN MÁY BAY -----");
  console.log("Họ tên: " + ticket.name);
  console.log("Mã PNR: " + ticket.pnr + " | Ghế: " + ticket.seat);
  console.log("Hạng vé: " + ticket.type);
  console.log("Hành lý: " + ticket.baggage + " kg");
  console.log("Phí quá cước: " + ticket.fee + " VNĐ");
  console.log("Trạng thái: " + ticket.status);
  console.log("---------------------------");
}

function listTickets() {
  console.log("=== DANH SÁCH VÉ ===");
  console.table(tickets);
}

function checkIn() {
  let pnr = prompt("Nhập mã PNR cần check-in:");
  if (!pnr) return;

  let ticket = findTicketByPnr(pnr);
  if (!ticket) {
    alert("Không tìm thấy vé!");
    return;
  }

  if (ticket.status === "CHECKED_IN") {
    alert("Vé này đã check-in rồi!");
    return;
  }
  if (ticket.status === "CANCELLED") {
    alert("Vé này đã bị hủy, không check-in được!");
    return;
  }

  let weight = Number(prompt("Nhập số kg hành lý:"));
  if (isNaN(weight) || weight < 0) {
    alert("Số kg nhập vào không hợp lệ!");
    return;
  }

  let fee = calculateExcessBaggageFee(ticket.type, weight);
  ticket.baggage = weight;
  ticket.fee = fee;
  ticket.status = "CHECKED_IN";

  if (fee > 0) {
    alert("Hành lý quá cước! Phụ thu: " + fee + " VNĐ");
  } else {
    alert("Check-in thành công (không quá cân).");
  }

  displayBoardingPass(ticket);
}

function searchTicket() {
  let keyword = prompt("Nhập mã PNR hoặc tên khách cần tìm:");
  if (!keyword) return;

  let results = [];
  for (let i = 0; i < tickets.length; i++) {
    let t = tickets[i];
    if (t.pnr.toLowerCase().includes(keyword.toLowerCase()) || 
        t.name.toLowerCase().includes(keyword.toLowerCase())) {
      results.push(t);
    }
  }

  if (results.length > 0) {
    console.table(results);
  } else {
    alert("Không tìm thấy vé nào phù hợp!");
  }
}

function cancelTicket() {
  let pnr = prompt("Nhập mã PNR của vé cần hủy:");
  if (!pnr) return;

  let ticket = findTicketByPnr(pnr);
  if (!ticket) {
    alert("Không tìm thấy vé!");
    return;
  }

  if (ticket.status === "CANCELLED") {
    alert("Vé này đã hủy trước đó rồi!");
    return;
  }

  ticket.status = "CANCELLED";
  alert("Đã hủy vé thành công!");
}

function main() {
  let choice = 0;
  do {
    choice = prompt(
      "--- QUẢN LÝ BÁN VÉ & CHECK-IN ---\n" +
      "1. Xem danh sách vé\n" +
      "2. Check-in & Cân hành lý\n" +
      "3. Tìm kiếm vé\n" +
      "4. Hủy vé\n" +
      "5. Thoát\n" +
      "Nhập lựa chọn của bạn (1-5):"
    );

    switch (choice) {
      case "1":
        listTickets();
        break;
      case "2":
        checkIn();
        break;
      case "3":
        searchTicket();
        break;
      case "4":
        cancelTicket();
        break;
      case "5":
        alert("Đã thoát chương trình!");
        break;
      default:
        alert("Lựa chọn sai, vui lòng chọn lại từ 1 đến 5!");
        break;
    }
  } while (choice !== "5");
}

main();