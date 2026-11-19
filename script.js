let count = 0;
let surahsLoaded = false;

// ========================
// التنقل بين الأقسام
// ========================

function showSection(name) {

    const sections = [
        "quranArea",
        "tasbeehArea",
        "azkarArea",
        "duaArea"
    ];

    sections.forEach(id => {
        document.getElementById(id).hidden = true;
    });

    if (name === "quran") {
        document.getElementById("quranArea").hidden = false;
        loadSurahs();
    }

    if (name === "tasbeeh") {
        document.getElementById("tasbeehArea").hidden = false;
    }

    if (name === "azkar") {
        document.getElementById("azkarArea").hidden = false;
    }

    if (name === "dua") {
        document.getElementById("duaArea").hidden = false;
    }
}

// ========================
// المسبحة الإلكترونية
// ========================

function increase() {
    count++;
    document.getElementById("count").innerText = count;
}

function resetCount() {
    count = 0;
    document.getElementById("count").innerText = count;
}

// ========================
// القرآن الكريم
// ========================

async function loadSurahs() {

    if (surahsLoaded) return;

    const select = document.getElementById("surahSelect");
    const status = document.getElementById("quranStatus");

    try {
        status.innerText = "جارٍ تحميل السور...";

        const response = await fetch(
            "https://api.alquran.cloud/v1/surah"
        );

        if (!response.ok) throw new Error();

        const result = await response.json();

        result.data.forEach(surah => {
            const option = document.createElement("option");
            option.value = surah.number;
            option.textContent = surah.name;
            select.appendChild(option);
        });

        surahsLoaded = true;
        status.innerText = "اختر السورة للقراءة";

    } catch (error) {
        status.innerText = "تعذر التحميل. تحقق من الإنترنت.";
    }
}

async function loadSurah(number) {

    const area = document.getElementById("quranText");
    const status = document.getElementById("quranStatus");

    area.replaceChildren();

    if (!number) return;

    try {
        status.innerText = "جارٍ تحميل الآيات...";

        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${number}`
        );

        if (!response.ok) throw new Error();

        const result = await response.json();

        result.data.ayahs.forEach(ayah => {
            const verse = document.createElement("p");
            verse.textContent = ayah.text + " ۞ ";
            area.appendChild(verse);
        });

        status.innerText = "سورة " + result.data.name;

    } catch (error) {
        status.innerText = "تعذر تحميل السورة. تحقق من الإنترنت.";
    }
}

document.getElementById("surahSelect")
    .addEventListener("change", function() {
        loadSurah(this.value);
    });

// ========================
// الأذكار
// ========================

// هذه مجموعة أولية من الأذكار المأثورة.
// الأعداد المذكورة هي عدد مرات التكرار.

const azkar = {

    morning: {
        title: "أذكار الصباح",
        items: [
            {
                text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. رب أسألك خير ما في هذا اليوم وخير ما بعده، وأعوذ بك من شر ما في هذا اليوم وشر ما بعده. رب أعوذ بك من الكسل وسوء الكبر. رب أعوذ بك من عذاب في النار وعذاب في القبر.",
                times: 1
            },
            {
                text: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.",
                times: 1
            },
            {
                text: "رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً.",
                times: 3
            },
            {
                text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم.",
                times: 3
            },
            {
                text: "سبحان الله وبحمده.",
                times: 100
            },
            {
                text: "أستغفر الله وأتوب إليه.",
                times: 100
            }
        ]
    },

    evening: {
        title: "أذكار المساء",
        items: [
            {
                text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. رب أسألك خير ما في هذه الليلة وخير ما بعدها، وأعوذ بك من شر ما في هذه الليلة وشر ما بعدها. رب أعوذ بك من الكسل وسوء الكبر. رب أعوذ بك من عذاب في النار وعذاب في القبر.",
                times: 1
            },
            {
                text: "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
                times: 1
            },
            {
                text: "رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً.",
                times: 3
            },
            {
                text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم.",
                times: 3
            },
            {
                text: "سبحان الله وبحمده.",
                times: 100
            },
            {
                text: "أستغفر الله وأتوب إليه.",
                times: 100
            }
        ]
    },

    sleep: {
        title: "أذكار النوم",
        items: [
            {
                text: "باسمك اللهم أموت وأحيا.",
                times: 1
            },
            {
                text: "اللهم أسلمت نفسي إليك، وفوضت أمري إليك، ووجهت وجهي إليك، وألجأت ظهري إليك، رغبة ورهبة إليك، لا ملجأ ولا منجا منك إلا إليك، آمنت بكتابك الذي أنزلت، وبنبيك الذي أرسلت.",
                times: 1
            }
        ]
    },

    wake: {
        title: "أذكار الاستيقاظ",
        items: [
            {
                text: "الحمد لله الذي أحيانا بعدما أماتنا وإليه النشور.",
                times: 1
            }
        ]
    }

};

// ========================
// عرض الأذكار والعداد
// ========================

function showAzkar(type) {

    const data = azkar[type];

    if (!data) return;

    const title = document.getElementById("azkarTitle");
    const list = document.getElementById("azkarList");

    title.innerText = data.title;
    list.replaceChildren();

    data.items.forEach((item, index) => {

        let current = 0;

        const card = document.createElement("div");
        card.className = "azkar-card";

        const text = document.createElement("p");
        text.className = "azkar-text";
        text.innerText = item.text;

        const counter = document.createElement("p");
        counter.className = "azkar-counter";
        counter.innerText =
            "التكرار: 0 من " + item.times;

        const button = document.createElement("button");
        button.innerText = "اضغط للتكرار";

        const done = document.createElement("p");
        done.className = "azkar-done";
        done.innerText = "";

        button.onclick = function() {

            if (current < item.times) {
                current++;
            }

            counter.innerText =
                "التكرار: " + current + " من " + item.times;

            if (current === item.times) {
                button.disabled = true;
                button.innerText = "اكتمل الذكر ✓";
                done.innerText = "أحسنت، اكتمل الذكر";
            }
        };

        card.appendChild(text);
        card.appendChild(counter);
        card.appendChild(button);
        card.appendChild(done);

        list.appendChild(card);
    });
}