/* ==========================================================
   Lumière Aesthetic Clinic — data.js
   Mock data — treatments, specialists, appointments, clients, chart values (frontend prototype: no backend)
   ========================================================== */

/* ================= MOCK DATA ================= */
const CATEGORIES = ["All","Facial Treatments","Laser Hair Removal","Acne Treatments","Skin Rejuvenation"];

const TREATMENTS = [
  {id:1, name:"Signature Glow Facial", cat:"Facial Treatments", art:"art-1",
   desc:"Deep cleanse, enzyme exfoliation and lymphatic massage for immediate luminosity.",
   dur:"60 min", price:420, from:false, featured:true},
  {id:2, name:"Hydra Infusion Facial", cat:"Facial Treatments", art:"art-5",
   desc:"Vortex hydration that plumps dehydrated skin and refines pores in one session.",
   dur:"50 min", price:390, from:false},
  {id:3, name:"Collagen Sculpt Facial", cat:"Facial Treatments", art:"art-3",
   desc:"Firming micro-current facial that lifts and defines the jaw and cheekbones.",
   dur:"75 min", price:520, from:false},
  {id:4, name:"Full Legs Laser", cat:"Laser Hair Removal", art:"art-2",
   desc:"Medical-grade diode laser for smooth, lasting results on the full leg area.",
   dur:"45 min", price:340, from:true, featured:true},
  {id:5, name:"Underarm Laser", cat:"Laser Hair Removal", art:"art-6",
   desc:"Quick, comfortable sessions with visible reduction from the first visits.",
   dur:"15 min", price:120, from:true},
  {id:6, name:"Face & Neck Laser", cat:"Laser Hair Removal", art:"art-4",
   desc:"Precise, gentle laser designed for delicate facial skin and fine hair.",
   dur:"25 min", price:180, from:true},
  {id:7, name:"Clarifying Acne Protocol", cat:"Acne Treatments", art:"art-6",
   desc:"Salicylic peel, extractions and LED blue-light therapy to calm active breakouts.",
   dur:"55 min", price:360, from:false, featured:true},
  {id:8, name:"Acne Scar Resurfacing", cat:"Acne Treatments", art:"art-8",
   desc:"Fractional treatment that softens post-acne texture and pigmentation.",
   dur:"60 min", price:580, from:true},
  {id:9, name:"Back Clarity Treatment", cat:"Acne Treatments", art:"art-2",
   desc:"Targeted cleansing and peeling protocol for congested back and shoulders.",
   dur:"45 min", price:320, from:false},
  {id:10, name:"Microneedling Renewal", cat:"Skin Rejuvenation", art:"art-3",
   desc:"Collagen-induction therapy that smooths fine lines and refines skin texture.",
   dur:"70 min", price:650, from:true},
  {id:11, name:"Vitamin C Brightening Peel", cat:"Skin Rejuvenation", art:"art-7",
   desc:"Antioxidant peel that fades sun damage and restores an even, lit tone.",
   dur:"40 min", price:380, from:false},
  {id:12, name:"LED Light Therapy", cat:"Skin Rejuvenation", art:"art-5",
   desc:"Relaxing red-light session that boosts circulation and skin recovery.",
   dur:"30 min", price:220, from:false}
];

const SPECIALISTS = [
  {id:1, name:"Dr. Noa Berman",  role:"Medical Aesthetician", exp:"11 yrs · laser & rejuvenation", av:"av-1", initials:"NB"},
  {id:2, name:"Dr. Amir Shalev", role:"Dermatologist",        exp:"14 yrs · acne & skin health", av:"av-2", initials:"AS"},
  {id:3, name:"Lior Katz",       role:"Senior Esthetician",   exp:"8 yrs · signature facials",   av:"av-3", initials:"LK"},
  {id:4, name:"Tamar Azulay",    role:"Laser Specialist",     exp:"9 yrs · laser hair removal",  av:"av-4", initials:"TA"}
];

const TIME_SLOTS = ["09:00","10:30","12:00","14:30","16:00","17:30"];

const HISTORY = [
  {name:"Signature Glow Facial", spec:"Lior Katz",     date:"12 Jul 2026", price:420, pts:85,  art:"art-1"},
  {name:"Underarm Laser · #4",   spec:"Tamar Azulay",  date:"20 Jun 2026", price:120, pts:25,  art:"art-6"},
  {name:"Vitamin C Brightening Peel", spec:"Dr. Noa Berman", date:"18 May 2026", price:380, pts:75, art:"art-7"},
  {name:"Hydra Infusion Facial", spec:"Lior Katz",     date:"9 Apr 2026",  price:390, pts:80,  art:"art-5"},
  {name:"LED Light Therapy",     spec:"Dr. Noa Berman",date:"2 Mar 2026",  price:220, pts:45,  art:"art-5"}
];

const TODAY_APPTS = [
  {client:"Maya Cohen",   ci:"MC", av:"av-1", treat:"Signature Glow Facial", spec:"Lior Katz",      time:"09:00", status:"confirmed"},
  {client:"Yael Peretz",  ci:"YP", av:"av-3", treat:"Full Legs Laser",       spec:"Tamar Azulay",   time:"10:30", status:"progress"},
  {client:"Dana Mizrahi", ci:"DM", av:"av-2", treat:"Clarifying Acne Protocol", spec:"Dr. Amir Shalev", time:"12:00", status:"confirmed"},
  {client:"Roni Avital",  ci:"RA", av:"av-4", treat:"Microneedling Renewal", spec:"Dr. Noa Berman", time:"14:30", status:"pending"},
  {client:"Shira Gold",   ci:"SG", av:"av-1", treat:"Underarm Laser",        spec:"Tamar Azulay",   time:"16:00", status:"confirmed"},
  {client:"Noa Friedman", ci:"NF", av:"av-3", treat:"Hydra Infusion Facial", spec:"Lior Katz",      time:"17:30", status:"pending"}
];

const WEEK_APPTS = [
  {client:"Tal Baruch",   ci:"TB", av:"av-2", treat:"Face & Neck Laser", spec:"Tamar Azulay",  date:"Mon 3 Aug", time:"11:00", status:"completed"},
  {client:"Michal Oren",  ci:"MO", av:"av-4", treat:"Collagen Sculpt Facial", spec:"Lior Katz", date:"Tue 4 Aug", time:"13:30", status:"completed"},
  {client:"Adi Navon",    ci:"AN", av:"av-1", treat:"Acne Scar Resurfacing", spec:"Dr. Amir Shalev", date:"Wed 5 Aug", time:"09:30", status:"completed"},
  {client:"Efrat Lev",    ci:"EL", av:"av-3", treat:"LED Light Therapy", spec:"Dr. Noa Berman", date:"Thu 6 Aug", time:"15:00", status:"completed"},
  {client:"Maya Cohen",   ci:"MC", av:"av-1", treat:"Signature Glow Facial", spec:"Lior Katz",  date:"Sun 9 Aug", time:"09:00", status:"confirmed"},
  {client:"Yael Peretz",  ci:"YP", av:"av-3", treat:"Full Legs Laser", spec:"Tamar Azulay",     date:"Sun 9 Aug", time:"10:30", status:"progress"},
  {client:"Dana Mizrahi", ci:"DM", av:"av-2", treat:"Clarifying Acne Protocol", spec:"Dr. Amir Shalev", date:"Sun 9 Aug", time:"12:00", status:"confirmed"},
  {client:"Roni Avital",  ci:"RA", av:"av-4", treat:"Microneedling Renewal", spec:"Dr. Noa Berman", date:"Sun 9 Aug", time:"14:30", status:"pending"}
];

const CLIENTS = [
  {name:"Maya Cohen",    ci:"MC", av:"av-1", phone:"+972 52 384 1170", visits:14, pts:720, last:"12 Jul 2026", tier:"Gold"},
  {name:"Yael Peretz",   ci:"YP", av:"av-3", phone:"+972 54 221 8834", visits:9,  pts:445, last:"28 Jul 2026", tier:"Silver"},
  {name:"Dana Mizrahi",  ci:"DM", av:"av-2", phone:"+972 50 917 2245", visits:21, pts:1130,last:"1 Aug 2026",  tier:"Platinum"},
  {name:"Roni Avital",   ci:"RA", av:"av-4", phone:"+972 53 640 7781", visits:5,  pts:260, last:"15 Jul 2026", tier:"Silver"},
  {name:"Shira Gold",    ci:"SG", av:"av-1", phone:"+972 52 118 6602", visits:11, pts:590, last:"22 Jul 2026", tier:"Gold"},
  {name:"Noa Friedman",  ci:"NF", av:"av-3", phone:"+972 58 402 9913", visits:3,  pts:140, last:"30 Jun 2026", tier:"Member"},
  {name:"Tal Baruch",    ci:"TB", av:"av-2", phone:"+972 54 775 3348", visits:7,  pts:365, last:"3 Aug 2026",  tier:"Silver"},
  {name:"Michal Oren",   ci:"MO", av:"av-4", phone:"+972 50 236 4459", visits:16, pts:820, last:"4 Aug 2026",  tier:"Gold"}
];

const WEEK_CHART = [
  {day:"Sun", val:14, hot:true},{day:"Mon", val:9},{day:"Tue", val:11},{day:"Wed", val:12},
  {day:"Thu", val:13},{day:"Fri", val:7},{day:"Sat", val:0}
];

const STATUS_LABEL = {confirmed:["Confirmed","chip--confirmed"], pending:["Pending","chip--pending"], progress:["In progress","chip--progress"], completed:["Completed","chip--completed"]};
const nis = v => "₪" + v.toLocaleString();
