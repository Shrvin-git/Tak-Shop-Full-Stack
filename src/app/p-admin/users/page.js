"use client";
import { useEffect, useState, useMemo } from "react";
import ShowAll from "@/components/modules/showAll/ShowAll";
import Box from "@/components/templates/admin-panel/users/Box";
import Table from "@/components/templates/admin-panel/users/Table";
import styles from "@/styles/p-admin/users.module.css";
import AllUserIcon from "@/components/modules/svgs/AllUserIcon";
import ReviewUsers from "@/components/modules/svgs/ReviewUsers";
import BanUsers from "@/components/modules/svgs/BanUsers";
import Pagination from "@/components/shared/Pagination";
import FilterBar from "@/utils/FilterControls"; // اینجا: همون فایل قدیمی، ولی کامپوننت FilterBar است

function Page() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  // دریافت کاربران از API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // گزینه‌های فیلتر
  const filterOptions = [
    { value: "all", title: "همه کاربران" },
    { value: "active", title: "کاربران فعال" },
    { value: "banned", title: "کاربران مسدود شده" },
  ];

  // منطق فیلتر
  const filterLogic = {
    all: (list) => list,
    active: (list) => list.filter((u) => u.isBan === false),
    banned: (list) => list.filter((u) => u.isBan === true),
  };

  // اعمال فیلتر
  const filteredUsers = useMemo(() => {
    const filterFn = filterLogic[filter];
    return filterFn ? filterFn(users) : users;
  }, [filter, users]);

  // آمار کارت‌ها (روی همه کاربران، نه فقط فیلتر شده)
  const totalUsers = users.length;
  const bannedUsers = users.filter((u) => u.isBan).length;
  const activeUsers = users.filter((u) => !u.isBan).length;

  // صفحه‌بندی — طبق خواسته‌ات، بدون هیچ تغییری
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const paginatedUsers = filteredUsers.slice(firstIndex, lastIndex);

  // هنگام تغییر فیلتر، برو به صفحه ۱
  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className={styles["admin-page"]}>
      <div className={styles["admin-page__content"]}>
        {/* ==== Info Section ==== */}
        <div
          className={`${styles["admin-section"]} ${styles["admin-section--info"]}`}
        >
          <Box
            title={"تعداد کاربران ثبت شده"}
            value={totalUsers}
            icon={<AllUserIcon />}
          />
          <Box
            title={"کاربران فعال"}
            value={activeUsers}
            icon={<AllUserIcon />}
          />
          <Box
            title={"کاربران مسدود شده"}
            value={bannedUsers}
            icon={<BanUsers />}
          />
          <Box
            title={"کاربران جدید"}
            value={users.slice(0, 5).length}
            icon={<ReviewUsers />}
          />
        </div>

        {/* ==== Table Section ==== */}
        <div
          className={`${styles["admin-section"]} ${styles["admin-section--orders"]}`}
        >
          <h3>جدول کاربران</h3>

          <FilterBar
            options={filterOptions}
            value={filter}
            onChange={handleFilterChange}
          />

          {/* جدول فقط دیتاهای صفحه فعلی را می‌گیرد */}
          <Table user={paginatedUsers} />

          {/* صفحه‌بندی بر اساس تعداد کاربران فیلتر شده */}
          <Pagination
            totalItems={filteredUsers} // همون چیزی که خودت داشتی
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
