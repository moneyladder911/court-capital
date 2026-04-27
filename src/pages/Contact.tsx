import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <main>
        {/* Hero */}
        <section className="pt-40 pb-20 md:pt-48 md:pb-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <p className="font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-primary/70 mb-6">
              Contact
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8">
              Get in <span className="italic text-primary">touch</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[550px]">
              For membership enquiries, partnership opportunities, or
              general questions — we'd like to hear from you.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="divider max-w-[1200px] mx-auto" />

        {/* Contact form + info */}
        <section className="py-20 md:py-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
              {/* Form */}
              <div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="block font-sans text-[0.6rem] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-3">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[0.6rem] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Your email address"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[0.6rem] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-3">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="form-input resize-none"
                        placeholder="How can we help?"
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      Send Message
                    </button>
                  </form>
                ) : (
                  <div className="py-12">
                    <div className="w-12 h-px bg-primary/40 mb-8" />
                    <h3 className="font-display text-2xl text-foreground mb-4">
                      Message Sent
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      Thank you for reaching out. We'll respond within
                      48 hours.
                    </p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-12 md:pt-2">
                <div>
                  <p className="font-sans text-[0.6rem] font-medium tracking-[0.25em] uppercase text-primary mb-3">
                    Location
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    Dubai, United Arab Emirates
                  </p>
                  <p className="font-sans text-xs text-muted-foreground/60 mt-1">
                    Exact address disclosed to members
                  </p>
                </div>

                <div>
                  <p className="font-sans text-[0.6rem] font-medium tracking-[0.25em] uppercase text-primary mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:hello@thepadelhouse.com"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    hello@thepadelhouse.com
                  </a>
                </div>

                <div>
                  <p className="font-sans text-[0.6rem] font-medium tracking-[0.25em] uppercase text-primary mb-3">
                    Social
                  </p>
                  <a
                    href="#"
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </div>

                <div>
                  <p className="font-sans text-[0.6rem] font-medium tracking-[0.25em] uppercase text-primary mb-3">
                    Response Time
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    Within 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Contact;
