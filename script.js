
const inputPesan = document.getElementById("pesan");
const tombolKirim = document.getElementById("kirim");
const areaChat = document.getElementById("chat");

// Ganti dengan URL backend Able setelah hosting selesai.
const ALAMAT_SERVER = "https://URL-BACKEND-ABLE-KAMU/chat";

function tambahPesan(teks, kelas, nama) {
    const gelembung = document.createElement("div");
    gelembung.className = kelas;

    const label = document.createElement("b");
    label.textContent = nama;

    const isi = document.createElement("div");
    isi.className = "isi-pesan";

    if (
        kelas === "pesan-able" &&
        typeof marked !== "undefined" &&
        typeof DOMPurify !== "undefined"
    ) {
        isi.innerHTML = DOMPurify.sanitize(marked.parse(teks));
    } else {
        isi.textContent = teks;
    }

    gelembung.appendChild(label);
    gelembung.appendChild(isi);
    areaChat.appendChild(gelembung);

    areaChat.scrollTop = areaChat.scrollHeight;
}

async function kirimPesan() {
    const teks = inputPesan.value.trim();

    if (!teks) return;

    tambahPesan(teks, "pesan-user", "Kamu");
    inputPesan.value = "";
    tombolKirim.disabled = true;
    tombolKirim.textContent = "...";

    try {
        const respons = await fetch(ALAMAT_SERVER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pesan: teks })
        });

        const data = await respons.json();

        if (!respons.ok) {
            throw new Error(data.error || "Permintaan gagal.");
        }

        tambahPesan(data.balasan, "pesan-able", "Able");
    } catch (error) {
        console.error(error);

        tambahPesan(
            "Maaf, Able belum bisa terhubung ke server.",
            "pesan-able",
            "Able"
        );
    } finally {
        tombolKirim.disabled = false;
        tombolKirim.textContent = "Kirim";
        inputPesan.focus();
    }
}

tombolKirim.addEventListener("click", kirimPesan);

inputPesan.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        kirimPesan();
    }
});
      
