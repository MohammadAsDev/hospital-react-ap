import React from "react";
import image0 from "./../../assets/images/sections/00.jpg";
import image1 from "./../../assets/images/sections/1.png";
import image2 from "./../../assets/images/sections/2.png";
import image3 from "./../../assets/images/sections/9.jpg";
import image4 from "./../../assets/images/sections/4.png";
import image5 from "./../../assets/images/sections/10.jpg";
import image6 from "./../../assets/images/sections/12.jpg";
import image7 from "./../../assets/images/sections/13.jpg";

const sections = [
  { title: "القسطرة وجراحة القلب", image: image0, description: "يعمل القسم على مدار الساعة ومستعد لاستقبال جميع الحالات  القلبية الاسعافية والباردة" },
  { title: "قسم العمليات الجراحية", image: image2, description: "مجهز بأحدث التقنيات والمعدات الجراحية والتنظيرية وأجهزة التخدير والانعاش مستعد للقيام بكافة العمليات الجراحية البسيطة والمعقدة" },
  { title: "قسم النسائية والولادة", image: image3, description: "يحوي غرفة عمليات نسائة وقسم الاطفال و غرف اقامة وقاعة حواضن وغرف مخاض" },
  { title: "قسم العناية المركزة", image: image4, description: "مجهز بمجموعة من احدث التجهيزات والتقنيات" },
  {
    title: "قسم الأشعة",
    image: image5,
    description: (
      <div>
        <h5>يحوي عدد من الاجهزة : جهاز طبقي محوري متعدد الشرائح</h5>
        <h5>جهاز التصوير الشعاعي المتحرك</h5>
        <h5>جهاز الطبقي المحوري للأسنان والفكين</h5>
        <h5>جهاز قياس الكثافة العظمية</h5>
        <h5>جهاز تصوير الثدي "المامواجرام"</h5>
        <h5>جهاز الايكو</h5>
      </div>
    ),
  },
  { title: "قسم العيادات الخارجية", image: image6, description: " تستقبل المرضى أيام الاسبوع من الساعة التاسعة صباحا حتى الثالثة ظهرا وتجرى بالعيادات كافة الاجراءات التشخصية العلاجية " },
  { title: "قسم العينية", image: image1, description: "مجهز بأحدث التقنيات والمعدات الجراحية ويتم فيه عمليات  زراعة عدسة و الماء الزرقاء" },
  { title: "قسم التجميل والجراحة التجميلية ", image: image7, description: "مجهز بأحدث التقنيات يتم فيه إجراء الليزر والعناية بالبشرة وعمليات  شدونحت الجسم . تجميل الانف والوجه . شفط دهون الجسم .تكبير وتصغير وشد الثدي" },
];

export default function OurSections() {
  return (
    <div className="md:mt-52_ mt-24 md:mt-36 w-full max-w-7xl mx-auto py-4 px-8">
      <div className="flex mb-12 md:mb-16 justify-between items-center">
        <div className="flex items-end gap-3 ">
          <h5 className="text-blue-800 font-extrabold text-3xl md:text-4xl">
            {"أقسامنا"}
          </h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-8 gap-10 md:gap-3">
        {sections.map((item, index) => (
          <div
            key={index}
            className="group relative mx-auto w-72 mt-8 bg-gradient-to-l shadow-lg shadow-blue-700  from-blue-800 to-blue-700 shadow-md rounded-md overflow-hidden"
          >
            <div className="w-72 h-72 overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="w-72 h-72 object-cover hover:scale-110 hover:rotate-2 duration-700"
              />
            </div>
            <div className="flex justify-center text-white  text-2xl text-center items-center p-2 gap-2 h-28">
              <h5>{item.title}</h5>
            </div>
            <div className="group-hover:opacity-100 opacity-0 duration-700 text-white bg-blue-800/60 h-full w-full flex flex-col cursor-help justify-center p-4  absolute top-0 bottom-0 right-0 left-0 ">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
