import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="accordion-color">
      <h2 id="accordion-color-heading-1">
        <button
          type="button"
          className="flex items-center justify-between text-xl w-full p-5 font-medium rtl:text-right text-blue-800 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => toggleAccordion(1)}
          aria-expanded={activeIndex === 1}
          aria-controls="accordion-color-body-1"
        >
          <span>التغذية للرضاعة الطبيعية</span>
          <IoIosArrowDown
            className={`w-3 h-3 transform ${
              activeIndex === 1 ? "rotate-180" : ""
            }`}
          />
        </button>
      </h2>
      {activeIndex === 1 && (
        <div
          id="accordion-color-body-1"
          className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
        >
          <h5 className="text-xl">
            قد تسبب التغذية للرضاعة الطبيعية الحيرة والارتباك. ما مقدار ما ينبغي
            تناوله؟ ما الذي ينبغي اجتنابه؟ كيف يمكن أن يؤثر النظام الغذائي على
            الطفل؟ ينبغي اتباع نصائح التغذية المهمة التالية.
          </h5>
          <h5 className="text-xl">
            يجب التركيز على الاختيارات الصحية التي تساعدك على زيادة إدرار
            الحليب. اختاري أطعمة غنية بالبروتين مثل اللحوم خفيفة الدهن والبيض
            ومنتجات الألبان والبقوليات والعدس والمأكولات البحرية قليلة الزئبق.
            واختاري أنواعًا متعددة من الحبوب الكاملة، بالإضافة إلى الفاكهة
            والخضراوات.
          </h5>
          <h5 className="text-xl">
            إن تناول مجموعة متنوعة من الأطعمة أثناء الرضاعة الطبيعية سيساعد على
            تغيير نكهة حليب الثدي. فيتذوق طفلك نكهات مختلفة قد تساعده على تقبل
            تناول الأطعمة الصلبة بسهولة في المستقبل.
          </h5>{" "}
        </div>
      )}

      <h2 id="accordion-color-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full text-xl p-5 font-medium rtl:text-right text-blue-800 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => toggleAccordion(2)}
          aria-expanded={activeIndex === 2}
          aria-controls="accordion-color-body-2"
        >
          <span>صحة البروستاتا</span>
          <IoIosArrowDown
            className={`w-3 h-3 transform ${
              activeIndex === 2 ? "rotate-180" : ""
            }`}
          />
        </button>
      </h2>
      {activeIndex === 2 && (
        <div
          id="accordion-color-body-2"
          className="p-5 border border-b-0 text-xl border-gray-200 dark:border-gray-700"
        >
          <h5>
            إن إعطاء الأولوية لصحة البروستاتا أمر ضروري للرجال، خاصة مع تقدمهم
            في السن. يعد سرطان البروستاتا من بين أكثر أنواع السرطان شيوعًا بين
            الرجال، ولكن الاكتشاف المبكر يمكن أن يحسن نتائج العلاج بشكل كبير.
            تشتمل حزمة صحة البروستاتا لدينا على فحوصات وتقييمات شاملة لضمان بقاء
            صحتك على أعلى مستوى. حزمة صحة المسالك البولية للرجال يعد الحفاظ على
            صحة المسالك البولية الجيدة أمرًا بالغ الأهمية، خاصة بالنسبة للرجال
            الذين تزيد أعمارهم عن 50 عامًا والذين هم أكثر عرضة للإصابة بسرطان
            البروستاتا وغيره من أمراض المسالك البولية. ونحن نوصي بإجراء فحص سنوي
            مع طبيب المسالك البولية للكشف عن أي مشاكل محتملة في وقت مبكر وتوفير
            العلاج السريع والفعال.
          </h5>
        </div>
      )}

      <h2 id="accordion-color-heading-3">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-blue-800 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => toggleAccordion(3)}
          aria-expanded={activeIndex === 3}
          aria-controls="accordion-color-body-3"
        >
          <span>نصائح لمرضى السكري </span>
          <IoIosArrowDown
            className={`w-3 h-3 transform ${
              activeIndex === 3 ? "rotate-180" : ""
            }`}
          />
        </button>
      </h2>
      {activeIndex === 3 && (
        <div
          id="accordion-color-body-3"
          className="p-5 border border-t-0 border-gray-200 dark:border-gray-700"
        >
          <h5>
            وضع خطة غذائية واتباع برنامج وجبات طعام متوازنة ومُراجعة مُختص
            التغذية مرّة في السنة على الأقل{" "}
          </h5>
          <h5>
            ممارسة التمارين الرياضيّة لمدّة 30 دقيقة خمس مرّات على الأقل في
            الأسبوع. وقبل البدء بممارسة الرياضة، ينبغي التحدّث مع الطبيب واطلاعه
            على نوع التمارين التي يُريد المريض ممارستها ليتم تعديل مواعيد أخذ
            الأدوية أو وجبات الطعام إذا كانت هناك حاجة لذلك
          </h5>
          <h5>
            اتباع مواعيد أخذ الأدوية حسب وصفة الطبيب على المريض معرفة التسميات
            العلمية والتجارية للأدوية التي يأخذها وطريقة عملها والاحتفاظ بقائمة
            أدويته معه طوال الوقت
          </h5>
          <h5>
            فحص مستوى الغلوكوز بانتظام حسب توصيات مُقدم الرعاية الصحية، وزيادة
            عدد مرات هذا الفحص عند الإصابة بمرض ما محاولة الحفاظ على مُستوى سُكر
            الدم ضمن النطاق المنصوح به. وعلى المريض الاتصال بالطبيب في حال
            انخفاض مستوى غلوكوز الدم لديه عن 3.8 مليمول، أي 70 ملغرام/ديسيلتر،
            ومعاناته من نقص غلوكوز الدم بطريقة لا يمكن تفسيرها أكثر من مرّة في
            الأسبوع وكذلك في حال ارتفاع مستوى الغلوكوز أكثر من 8.8 مليمول، أي
            160 ملغرام/ديسيلتر، لأكثر من أسبوع، أو إذا كانت نتائج الفحص أعلى من
            16.6 مليمول، أي 300 ملغرام/ديسيلتر، لمرتين متتاليتين الاتصال بالطبيب
            إذا كان مستوى غلوكوز الدم أعلى من 16.6 مليمول، أي 300
            ملغرام/ديسيلتر، وفحص البول للبحث عن الكيتونات إذا ما نصح الطبيب بذلك
            تسجيل نتائج فحص مستوى الغلوكوز في الدم والكيتونات في البول في سجلّ
            أو مُذكّرة يجلبها المريض عند مُراجعة الطبيب الالتزام بمواعيد مُراجعة
            مُقدم الرعاية الصحية وزيارة الطبيب على الأقل كلّ ثلاثة أو أربعة أشهر
            لإجراء الفحوصات الروتينيّة إذا ما كان المريض يتعالج بالأنسولين.
          </h5>
        </div>
      )}
      <h2 id="accordion-color-heading-3">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-blue-800 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => toggleAccordion(4)}
          aria-expanded={activeIndex === 4}
          aria-controls="accordion-color-body-3"
        >
          <span>نصائح للتغلب على السمنة </span>
          <IoIosArrowDown
            className={`w-3 h-3 transform ${
              activeIndex === 4 ? "rotate-180" : ""
            }`}
          />
        </button>
      </h2>
      {activeIndex === 4 && (
        <div
          id="accordion-color-body-3"
          className="p-5 border border-t-0 border-gray-200 dark:border-gray-700"
        >
          <h5>
            تعتبر السمنة مرض العصر، وهي سبب الإصابة بالعديد من الأمراض المزمنة
            كأمراض القلب والضغط، وذلك بخلاف عدم القدرة على الحركة، وفساد شكل
            الجسم لزيادة الدهون في بعض المناطق، إلا انه يمكن لبعض الحيل والنصائح
            ان نتغلب على مشكلة السمنة من الأساس.
          </h5>
          <h5>يمكنك اتباع ببعض النصائح أن نتغلب على السمنة، ومن أبرزها :</h5>
          <ul>
            <li>1- الامتناع أو التقليل لأقصى درجة من تناول الوجبات السريعة.</li>
            <li>
              2- الامتناع عن المشروبات الغازية المضاف لها سكر ويمكن استبدالها
              بالماء الطبيعي أو الماء الفوار.
            </li>
            <li>
              3- استبدال الوجبات الخفيفة المعلبة غير الصحية مثل رقائق البطاطس
              المحمرة والشوكولاتة بالوجبات الخفيفة الصحية، مثل: الفشار والذرة
              المسلوقة أو المشوية ورقائق الشوفان المحمص والمكسرات والفواكه
              والخضروات.
            </li>
            <li>
              4- تناول كمية مناسبة من الطعام في حدود السعرات اليومية المسموح بها
              في حالة الرغبة في عدم زيادة الوزن، وتقليل السعرات عن الاحتياج
              اليومي في حالة الرغبة في إنقاص الوزن.
            </li>
            <li>
              5- الانتباه لسعرات المأكولات والمشروبات الصحية وحسابها، مثل :
              سعرات الشوفان والمكسرات والأفوكادو والفواكه.
            </li>
            <li>
              6- تقليل استخدام الدهون واستبدال الدهون المهدرجة الضارة بالصحة
              باستخدام زيت الزيتون وزيت جوز الهند في الطبخ بكميات صغيرة.
            </li>
            <li>
              7- التقليل من استهلاك السكريات، خاصة السكر الأبيض والذي لا يوجد
              فقط في المشروبات؛ بل وأيضا في أنواع كثيرة من الخبز والعجائن
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accordion;
