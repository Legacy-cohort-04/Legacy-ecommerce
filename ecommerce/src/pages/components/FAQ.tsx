import React, { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What is MyCompany?',
      answer: 'MyCompany is a platform that provides [brief description of your company and services].',
    },
    {
      question: 'How can I create an account?',
      answer: 'You can create an account by clicking the \'Sign Up\' button on our homepage and filling out the required information.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods, including credit cards, PayPal, and bank transfers.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'If you\'ve forgotten your password, click on the \'Forgot Password?\' link on the login page and follow the instructions to reset it.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team by emailing support@mycompany.com or using the contact form on our website.',
    },
    {
      question: 'Where can I find your terms and conditions?',
      answer: 'You can find our terms and conditions on the Terms & Conditions page, accessible from the footer of our website.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqsection}>
      <h1>Frequently Asked Questions (FAQ)</h1>
      <div className={styles.faqgrid}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqitem}>
            <h2 className={styles.faqquestion} onClick={() => toggleAccordion(index)}>
              {faq.question}
              <button className={styles.expandbtn}>+</button>
            </h2>
            {activeIndex === index && <p className={styles.faqAnswer}>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;