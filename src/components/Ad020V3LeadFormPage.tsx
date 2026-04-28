import { useEffect } from "react";
import { trackStandardEvent } from "../lib/metaPixel";

interface Ad020V3LeadFormPageProps {
  onNavigate: (
    page:
      | "landing"
      | "consultation"
      | "schedule-demo"
      | "privacy"
      | "probate-checklist"
      | "team"
      | "limited-time-event"
      | "ad-020-landing"
      | "ad-020-schedule-demo"
      | "ad-020-v2-landing"
      | "ad-020-v2-schedule-demo"
      | "ad-020-v3-landing"
      | "ad-020-v3-schedule-demo"
  ) => void;
}

export default function Ad020V3LeadFormPage({
  onNavigate,
}: Ad020V3LeadFormPageProps) {
  useEffect(() => {
    trackStandardEvent("Lead", {
      pageName: "ad-020-v3-lead-form",
      adId: "ad-020-v3",
    });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://sibforms.com/forms/end-form/build/sib-styles.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://sibforms.com/forms/end-form/build/main.js";
    script.defer = true;
    document.body.appendChild(script);

    (window as any).REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
    (window as any).LOCALE = "en";
    (window as any).EMAIL_INVALID_MESSAGE = (
      window as any
    ).SMS_INVALID_MESSAGE =
      "The information provided is invalid. Please review the field format and try again.";
    (window as any).REQUIRED_ERROR_MESSAGE =
      "This field cannot be left blank. ";
    (window as any).GENERIC_INVALID_MESSAGE =
      "The information provided is invalid. Please review the field format and try again.";
    (window as any).translation = {
      common: {
        selectedList: "{quantity} list selected",
        selectedLists: "{quantity} lists selected",
        selectedOption: "{quantity} selected",
        selectedOptions: "{quantity} selected",
      },
    };
    (window as any).AUTOHIDE = Boolean(0);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-display: block;
            font-family: Roboto;
            src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff");
          }
          @font-face {
            font-display: fallback;
            font-family: Roboto;
            font-weight: 600;
            src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff");
          }
          @font-face {
            font-display: fallback;
            font-family: Roboto;
            font-weight: 700;
            src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff");
          }
          #sib-container input:-ms-input-placeholder {
            text-align: left;
            font-family: Helvetica, sans-serif;
            color: #c0ccda;
          }
          #sib-container input::placeholder {
            text-align: left;
            font-family: Helvetica, sans-serif;
            color: #c0ccda;
          }
          #sib-container textarea::placeholder {
            text-align: left;
            font-family: Helvetica, sans-serif;
            color: #c0ccda;
          }
          #sib-container a {
            text-decoration: underline;
            color: #2BB2FC;
          }
        `,
        }}
      />
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <div
          className="sib-form"
          style={{ textAlign: "center", backgroundColor: "#f1f6fd" }}
        >
          <div id="sib-form-container" className="sib-form-container">
            <div
              id="error-message"
              className="sib-form-message-panel"
              style={{
                fontSize: "16px",
                textAlign: "left",
                fontFamily: "Helvetica, sans-serif",
                color: "#661d1d",
                backgroundColor: "#ffeded",
                borderRadius: "3px",
                borderColor: "#ff4949",
                maxWidth: "540px",
              }}
            >
              <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                  <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
                </svg>
                <span className="sib-form-message-panel__inner-text">
                  Your request could not be saved. Please try again.
                </span>
              </div>
            </div>
            <div></div>
            <div
              id="success-message"
              className="sib-form-message-panel"
              style={{
                fontSize: "16px",
                textAlign: "left",
                fontFamily: "Helvetica, sans-serif",
                color: "#085229",
                backgroundColor: "#e7faf0",
                borderRadius: "3px",
                borderColor: "#13ce66",
                maxWidth: "540px",
              }}
            >
              <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
                </svg>
                <span className="sib-form-message-panel__inner-text">
                  Your request has been submitted!
                </span>
              </div>
            </div>
            <div></div>
            <div
              id="sib-container"
              className="sib-container--large sib-container--vertical"
              style={{
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,1)",
                maxWidth: "540px",
                borderRadius: "10px",
                borderWidth: "1px",
                borderColor: "#C0CCD9",
                borderStyle: "solid",
                direction: "ltr",
                margin: "0 auto",
              }}
            >
              <form
                id="sib-form"
                method="POST"
                action="https://4f2904b9.sibforms.com/serve/MUIFAJtfmoXZCnZS5_kkcqmt-hkbepIFsnGR0MfrBnREz9rkWvUGOwCLwrbU_NCQjz_2WnztgjaEcTM9XDzAT6QGerI4peBF-lHr6tnHOEx5NTNBO09Vu4SJ6yhSmYjVV0tzWuyFfOMqFfssDrKeRvXdo_LMcXGIEQYHCnEpY-dhXPnErQKnK4Yuhy2Jhg8Ea_1FQHOWqD0Y3niSOg=="
                data-type="subscription"
              >
                <div style={{ padding: "8px 0" }}>
                  <div
                    className="sib-form-block"
                    style={{
                      fontSize: "32px",
                      textAlign: "left",
                      fontWeight: "700",
                      fontFamily: "Helvetica, sans-serif",
                      color: "#1e293b",
                      backgroundColor: "transparent",
                    }}
                  >
                    <p>Tell us about your practice and interest in HeirFlow</p>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div
                    className="sib-form-block"
                    style={{
                      fontSize: "16px",
                      textAlign: "left",
                      fontFamily: "Helvetica, sans-serif",
                      color: "#1e293b",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="sib-text-form-block">
                      <p>
                        Share a few details and our team will follow up to
                        discuss fit and next steps.
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "8px 0" }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label className="entry__label" htmlFor="FIRSTNAME">
                          Name
                        </label>
                        <div className="entry__field">
                          <input
                            className="input"
                            type="text"
                            id="FIRSTNAME"
                            name="FIRSTNAME"
                            placeholder="Your full name"
                            data-required="true"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "8px 0" }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label className="entry__label" htmlFor="EMAIL">
                          Email
                        </label>
                        <div className="entry__field">
                          <input
                            className="input"
                            type="email"
                            id="EMAIL"
                            name="EMAIL"
                            placeholder="email@domain.com"
                            data-required="true"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "8px 0" }}>
                  <div className="sib-sms-field sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label className="entry__label" htmlFor="LANDLINE_NUMBER">
                          Phone Number
                        </label>
                        <div className="sib-sms-input-wrapper" style={{ direction: "ltr" }}>
                          <div
                            className="sib-sms-input"
                            data-placeholder="##########"
                            data-required="1"
                            data-country-code="US"
                            data-whatsapp-country-code="US"
                            data-value=""
                            data-whatsappvalue=""
                            data-attributename="LANDLINE_NUMBER"
                          >
                            <div className="entry__field">
                              <select className="input" name="SMS__COUNTRY_CODE" data-required="true">
                                <option value="+1">+1 US</option>
                              </select>
                            </div>
                            <div className="entry__field" style={{ width: "100%" }}>
                              <input
                                className="input"
                                type="tel"
                                id="SMS"
                                name="SMS"
                                autoComplete="off"
                                placeholder="##########"
                                data-required="true"
                                required
                              />
                            </div>
                          </div>
                          <div className="sib-sms-tooltip">
                            <div className="sib-sms-tooltip__box">
                              The LANDLINE_NUMBER field must contain between 6
                              and 19 digits and include the country code without
                              using +/0 (e.g. 1xxxxxxxxxx for the United States)
                            </div>
                            <span className="sib-sms-tooltip__icon">?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "8px 0" }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label className="entry__label" htmlFor="FIRM_NAME">
                          Firm
                        </label>
                        <div className="entry__field">
                          <input
                            className="input"
                            type="text"
                            id="FIRM_NAME"
                            name="FIRM_NAME"
                            placeholder="Your firm name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "8px 0" }}>
                  <div className="sib-input sib-form-block">
                    <div className="form__entry entry_block">
                      <div className="form__label-row">
                        <label
                          className="entry__label"
                          htmlFor="HEIRFLOW_INTEREST"
                        >
                          Interest in HeirFlow
                        </label>
                        <div className="entry__field">
                          <textarea
                            className="input"
                            id="SHORT_ANSWER"
                            name="SHORT_ANSWER"
                            rows={2}
                            maxLength={500}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "8px 0" }}>
                  <div className="sib-form-block" style={{ textAlign: "center" }}>
                    <button
                      className="sib-form-block__button sib-form-block__button-with-loader"
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        fontFamily: "Helvetica, sans-serif",
                        color: "#FFFFFF",
                        backgroundColor: "#2663eb",
                        borderRadius: "7px",
                        borderWidth: "0px",
                      }}
                      form="sib-form"
                      type="submit"
                    >
                      <svg
                        className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                        viewBox="0 0 512 512"
                      >
                        <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                      </svg>
                      Submit Answers
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  name="email_address_check"
                  defaultValue=""
                  className="input--hidden"
                />
                <input type="hidden" name="locale" value="en" />
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-slate-200">
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">
            Secure • Confidential • Professional
          </p>
          <p className="text-xs text-slate-400">
            <button
              onClick={() => onNavigate("privacy")}
              className="hover:text-blue-600 transition-colors underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}
