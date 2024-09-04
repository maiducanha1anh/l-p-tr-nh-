// Hàm khởi tạo Sinh Viên
class SinhVien {
    constructor(id, hoTen, gioiTinh, ngaySinh, queQuan) {
        this.id = id;
        this.hoTen = hoTen;
        this.gioiTinh = gioiTinh;
        this.ngaySinh = ngaySinh;
        this.queQuan = queQuan;
    }
}

// Lớp quản lý sinh viên
class QuanLySinhVien {
    constructor() {
        this.danhSachSinhVien = JSON.parse(localStorage.getItem('danhSachSinhVien')) || [];
    }

    hienThiSinhVien() {
        const bangSinhVien = document.getElementById('student-table-body');
        bangSinhVien.innerHTML = '';
        this.danhSachSinhVien.forEach((sinhVien) => {
            const hang = document.createElement('tr');
            hang.innerHTML = `
                <td>${sinhVien.id}</td>
                <td>${sinhVien.hoTen}</td>
                <td>${sinhVien.gioiTinh}</td>
                <td>${sinhVien.ngaySinh}</td>
                <td>${sinhVien.queQuan}</td>
                <td>
                    <button class="edit-btn" onclick="suaSinhVien('${sinhVien.id}')">Sửa</button>
                    <button class="delete-btn" onclick="xoaSinhVien('${sinhVien.id}')">Xóa</button>
                </td>
            `;
            bangSinhVien.appendChild(hang);
        });
    }

    themSinhVien(sinhVien) {
        this.danhSachSinhVien.push(sinhVien);
        this.capNhatLocalStorage();
        this.hienThiSinhVien();
    }

    capNhatSinhVien(sinhVienCapNhat) {
        this.danhSachSinhVien = this.danhSachSinhVien.map((sinhVien) =>
            sinhVien.id === sinhVienCapNhat.id ? sinhVienCapNhat : sinhVien
        );
        this.capNhatLocalStorage();
        this.hienThiSinhVien();
    }

    xoaSinhVien(idSinhVien) {
        this.danhSachSinhVien = this.danhSachSinhVien.filter((sinhVien) => sinhVien.id !== idSinhVien);
        this.capNhatLocalStorage();
        this.hienThiSinhVien();
    }

    capNhatLocalStorage() {
        localStorage.setItem('danhSachSinhVien', JSON.stringify(this.danhSachSinhVien));
    }
}

const quanLySinhVien = new QuanLySinhVien();
quanLySinhVien.hienThiSinhVien();

// Xử lý sự kiện submit form
document.getElementById('student-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('student-id').value || Date.now().toString();
    const hoTen = document.getElementById('name').value;
    const gioiTinh = document.getElementById('gender').value;
    const ngaySinh = document.getElementById('dob').value;
    const queQuan = document.getElementById('hometown').value;

    const sinhVien = new SinhVien(id, hoTen, gioiTinh, ngaySinh, queQuan);
    if (document.getElementById('student-id').value) {
        quanLySinhVien.capNhatSinhVien(sinhVien);
    } else {
        quanLySinhVien.themSinhVien(sinhVien);
    }

    // Đặt lại form
    document.getElementById('student-form').reset();
    document.getElementById('student-id').value = '';
});

// Hàm sửa sinh viên
function suaSinhVien(id) {
    const sinhVien = quanLySinhVien.danhSachSinhVien.find((sinhVien) => sinhVien.id === id);
    document.getElementById('student-id').value = sinhVien.id;
    document.getElementById('name').value = sinhVien.hoTen;
    document.getElementById('gender').value = sinhVien.gioiTinh;
    document.getElementById('dob').value = sinhVien.ngaySinh;
    document.getElementById('hometown').value = sinhVien.queQuan;
}

// Hàm xóa sinh viên
function xoaSinhVien(id) {
    quanLySinhVien.xoaSinhVien(id);
}
