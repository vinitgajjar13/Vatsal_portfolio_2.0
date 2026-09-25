import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolioData';
import { Mail, ArrowUpRight, Copy, Check, MapPin, Linkedin, Send, RotateCcw, ExternalLink, DraftingCompass, Clock, ShieldCheck } from 'lucide-react';
import { SectionHeader } from './animations/SectionHeader';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
    mailSubject: string;
    mailBody: string;
  } | null>(null);

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(personalInfo.email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = personalInfo.email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyTransmittal = async () => {
    if (!lastSubmitted) return;
    const fullText = `To: ${personalInfo.email}\nSubject: ${lastSubmitted.mailSubject}\n\n${lastSubmitted.mailBody}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  const triggerMailto = (mailSubject: string, mailBody: string) => {
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(mailBody)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = subject.trim()
      ? `[Inquiry] ${subject} - ${name}`
      : `[Inquiry] Project Contact from ${name || 'Engineering Client'}`;
    const mailBody = `Name: ${name}\nEmail: ${email}${subject ? `\nSubject: ${subject}` : ''}\n\nMessage:\n${message}`;

    setLastSubmitted({
      name,
      email,
      subject: subject || 'General Engineering Inquiry',
      message,
      mailSubject,
      mailBody
    });

    triggerMailto(mailSubject, mailBody);
    setIsSent(true);
  };

  return (
    <section 
      id="contact" 
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#EEEEEE] border-b border-[#929AAB]/20 relative overflow-hidden"
    >
      {/* Background CAD linework hint */}
      <div className="absolute inset-0 bg-cad-grid-dense opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          index="[ SECTION 04 // FINAL TRANSMITTAL & INQUIRY ]"
          title="Let's Connect"
          subtitle="Ready to discuss an electrical design project, single line diagram scope, or AutoCAD documentation requirements?"
          className="mb-14 sm:mb-20"
        />

        {/* Closing Experience - Two Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Collaboration Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#393E46] leading-snug mb-4">
                Structured Engineering Drawings & Reliable Turnaround
              </h3>
              <p className="text-sm sm:text-base text-[#393E46]/85 leading-relaxed font-sans">
                Whether you need preliminary 2D power layouts, single line diagrams for authority review, or complete revision-controlled drawing packages, I am available to support your project.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5">
              {/* Email Card with Copy Button */}
              <div className="p-4 bg-[#F7F7F7] border border-[#929AAB]/30 flex items-center justify-between shadow-2xs group hover:border-[#393E46] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xs bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#525866] uppercase block">DIRECT EMAIL</span>
                    <a 
                      href={`mailto:${personalInfo.email}`} 
                      className="font-mono text-xs sm:text-sm font-semibold text-[#393E46] hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 text-[#525866] hover:text-[#393E46] hover:bg-[#EEEEEE] border border-[#929AAB]/25 transition-colors cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 bg-[#F7F7F7] border border-[#929AAB]/30 flex items-center gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xs bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#525866] uppercase block">AVAILABILITY</span>
                  <span className="text-xs sm:text-sm font-medium text-[#393E46]">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* LinkedIn Card */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-[#F7F7F7] border border-[#929AAB]/30 flex items-center justify-between shadow-2xs group hover:border-[#393E46] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xs bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#525866] uppercase block">PROFESSIONAL NETWORK</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#393E46] group-hover:underline">
                      linkedin.com/in/vatsal-sonigra
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#525866] group-hover:text-[#393E46] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Quality Standard Guarantee Note */}
            <div className="p-4 bg-[#EEEEEE] border-l-2 border-[#393E46] text-xs font-mono text-[#525866] space-y-1">
              <div className="flex items-center gap-1.5 text-[#393E46] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#393E46]" />
                <span>TECHNICAL DELIVERABLES STANDARD</span>
              </div>
              <p>
                All drawing transmissions include editable .DWG files, ISO compliant high-resolution PDF sets, and synchronized schedules.
              </p>
            </div>

          </motion.div>

          {/* Right Column: Architectural Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-[#F7F7F7] border border-[#929AAB]/30 p-7 sm:p-10 shadow-xs relative"
          >
            {/* Top Frame Marker */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#929AAB]/20 text-[10px] font-mono text-[#525866] uppercase tracking-wider">
              <span>FORM TRANSMITTAL // DWG-INQUIRY</span>
              <span>SECURE DISPATCH</span>
            </div>

            {isSent && lastSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="py-4 space-y-6 text-left font-sans"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-[#929AAB]/20">
                  <div className="w-10 h-10 bg-[#393E46] text-[#F7F7F7] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#525866] uppercase tracking-wider block">
                      TRANSMITTAL DISPATCH READY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#393E46] leading-none">
                      Inquiry Prepared Successfully
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#393E46]/85 leading-relaxed">
                  Your email client has been prepared with your inquiry details. If your email application did not launch automatically, you can copy the pre-formatted text below directly into your webmail provider.
                </p>

                <div className="p-4 bg-[#EEEEEE] border border-[#929AAB]/30 space-y-2 text-xs font-mono text-[#393E46]">
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="text-[#525866] font-semibold">FROM:</span>
                    <span>{lastSubmitted.name}</span>
                    <span className="text-[#525866]">({lastSubmitted.email})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="text-[#525866] font-semibold">SUBJECT:</span>
                    <span>{lastSubmitted.subject}</span>
                  </div>
                  <div className="pt-2 border-t border-[#929AAB]/20 text-[11px] text-[#393E46]/80 line-clamp-3">
                    {lastSubmitted.message}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => triggerMailto(lastSubmitted.mailSubject, lastSubmitted.mailBody)}
                    className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 bg-[#393E46] text-[#F7F7F7] text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Mail Client Again</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyTransmittal}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 bg-[#EEEEEE] border border-[#929AAB]/30 text-xs font-mono uppercase tracking-wider text-[#393E46] hover:bg-[#EEEEEE]/80 transition-colors cursor-pointer"
                  >
                    {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#525866]" />}
                    <span>{copiedMessage ? 'Copied to Clipboard!' : 'Copy Message Text'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setEmail('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#525866] hover:text-[#393E46] hover:underline transition-colors cursor-pointer ml-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>New Message</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-[#393E46] mb-1.5 font-semibold">
                      Your Name / Company *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Vance / Apex Projects"
                      className="w-full px-4 py-3 min-h-[44px] bg-[#EEEEEE] border border-[#929AAB]/30 text-sm text-[#393E46] placeholder-[#525866]/50 focus:outline-none focus:border-[#393E46] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-[#393E46] mb-1.5 font-semibold">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. d.vance@company.com"
                      className="w-full px-4 py-3 min-h-[44px] bg-[#EEEEEE] border border-[#929AAB]/30 text-sm text-[#393E46] placeholder-[#525866]/50 focus:outline-none focus:border-[#393E46] transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-[#393E46] mb-1.5 font-semibold">
                    Inquiry Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. AutoCAD Drawings / Single Line Diagram Review"
                    className="w-full px-4 py-3 min-h-[44px] bg-[#EEEEEE] border border-[#929AAB]/30 text-sm text-[#393E46] placeholder-[#525866]/50 focus:outline-none focus:border-[#393E46] transition-colors font-sans"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-[#393E46] mb-1.5 font-semibold">
                    Project Scope & Drawing Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your electrical project requirements, CAD scale, target turnaround time, or specific scope..."
                    className="w-full px-4 py-3 bg-[#EEEEEE] border border-[#929AAB]/30 text-sm text-[#393E46] placeholder-[#525866]/50 focus:outline-none focus:border-[#393E46] transition-colors font-sans resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.025, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="group w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-3 px-9 py-3.5 bg-[#393E46] text-[#F7F7F7] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-xs border border-[#393E46]"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                    <span>Send Inquiry Transmittal</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                  </motion.button>
                </div>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
