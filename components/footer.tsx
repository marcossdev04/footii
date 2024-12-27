/* eslint-disable react/no-unescaped-entities */
import x from '@/assets/x.svg'
import telegram from '@/assets/telegram.svg'
import whatsapp from '@/assets/whatsapp.svg'
import instagram from '@/assets/instagram.svg'
import image18 from '@/assets/18.svg'
import gametherapy from '@/assets/gametherapy.svg'
import gamecare from '@/assets/gamecare.svg'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Dot } from 'lucide-react'
export function Footer() {
  return (
    <footer className="w-full mb-2 z-10 ">
      <div className="flex flex-col gap-2">
        <div className="text-sm">FOOTI™ 2025</div>
        <Dialog>
          <DialogTrigger className="text-sm flex">Privacy Policy</DialogTrigger>
          <DialogContent className="max-h-[85vh]">
            <DialogTitle className="text-default font-bai-bold">
              PRIVACY POLICY
            </DialogTitle>
            <div className="flex flex-col gap-2 overflow-auto max-h-[74vh]">
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">Introduction</div>
                <div className="text-xs text-zinc-300 text-justify">
                  Our Privacy Policy outlines how footi.ai manages the
                  information and data you provide to manage your relationship
                  with our website. By accepting this Privacy Policy, you
                  acknowledge and agree that it is necessary for footi.ai to
                  collect and store your personal data to allow you to access
                  and use the website and to participate in games. All personal
                  information and data provided by you are processed and
                  maintained by footi.ai in accordance with this Privacy Policy.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">Data Controller</div>
                <div className="text-xs text-zinc-300 text-justify">
                  The data controller for Footi is ALCHEMAX CONSULTING LTDA. Any
                  questions regarding data management can be sent to
                  support@footi.bet.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  Protection of Your Personal Data
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Footi.ai protects and maintains your information and personal
                  data according to our company's high standards and applicable
                  data protection laws. Applicable data protection laws define
                  that we can only process your personal data when there is a
                  legal basis for processing, including the 'legitimate
                  interest' proposed by us. The legal basis for processing may
                  be one of the following:
                  <div className="flex flex-col gap-1 text-xs text-zinc-300">
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        When you have given your consent for the processing
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        When necessary for the performance of any contract we
                        have with you
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        When necessary to comply with a legal obligation under
                        applicable laws, including anti-money laundering laws
                        and regulations
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        When necessary for the purposes of legitimate interests
                        pursued by us (or by a third party), unless overridden
                        by your interests, fundamental rights, and freedoms
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        When necessary to protect your vital interests or those
                        of another natural person When necessary to perform a
                        task carried out in the public interest
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  Legitimate Interests
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  The legitimate interest in processing your data is when we
                  have a business or commercial reason to do so. Your personal
                  data is protected at the same level as data collected for
                  regulatory reasons and any other legal basis, and we will not
                  process it in a way that is unfair to you or your interests.
                </div>
              </div>
              <div>
                <div className="text-lg font-bai-bold">
                  Types of Data We Collect and Process
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  When you visit our website and/or use our application,
                  register to use any of our services offered by us through our
                  website/application, or contact us, this Privacy Policy will
                  apply. The personal data we collect from you may include the
                  following:
                  <div className="flex flex-col gap-1 text-xs text-zinc-300">
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Information you provide when registering for our
                        services, completing forms on the website, or any other
                        information you send us through the website or email
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Information you provide in any correspondence and a
                        record of any correspondence we have with you
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Details of your visits to the website, including but not
                        limited to traffic data, location data, weblogs, and
                        other communication data
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Information about any possible criminal, fraudulent, or
                        anti-money laundering activity
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>Details of transactions you carry out with us</div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>Information about your use of our services</div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Information you provide through surveys you complete or
                        contests you participate in
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>Information about your preferences</div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Information about your betting history and patterns
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Telephone calls to and from our Customer Support Team
                        are recorded for training and security purposes, along
                        with resolving any queries arising from the service you
                        receive
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  How We Use Your Personal Data
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  We will process your personal data for the following purposes
                  and in accordance with the following legal conditions:
                  <div className="flex flex-col gap-1 text-xs text-zinc-300">
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To allow us to set up and operate your account so that
                        you can make full use of all the features of our
                        services (necessary for the performance of the contract)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To allow us to receive questions and comments from you
                        through our help center and to respond to them
                        (necessary for the performance of the contract)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To comply with relevant regulations regarding your
                        registration and the verification of the personal data
                        you provide, including the disclosure of such
                        information to third parties (including financial
                        institutions, age verification, and credit reporting
                        agencies) in connection with such purposes (legal
                        obligation)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        When you set deposit limits, we will use automated means
                        to track your deposit amounts to ensure we comply with
                        your request (consent)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To prepare statistics, provide analytical reports, and
                        conduct analyses related to your use of the services and
                        other customers (legitimate interests)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To periodically send you written communications to
                        announce important service changes, technical updates,
                        and changes to the General Terms, including this Privacy
                        Policy (necessary for the performance of the contract)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To send you offers and promotions that may be of
                        interest to you (but only when you have given your
                        consent)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To provide you with a personalized use of our services
                        so that we can offer you a better service. To profile
                        you so that we can better understand your preferences
                        and what products and offers would be most suitable for
                        you and customers similar to you (legitimate interests)
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To comply with the measures requested to identify and
                        investigate any suspected illegal, fraudulent, or
                        improper activity related to the services, including
                        possible money laundering, the use of proceeds of crime,
                        and fraud (legal obligation). When you open an account
                        with us, we want to assure you that we take your privacy
                        and security very seriously. As part of our commitment
                        to maintaining a safe and trustworthy gaming
                        environment, we may need to process your personal data
                        for anti-money laundering (AML) purposes
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        To comply with responsible gaming and social
                        responsibility obligations, we will monitor gaming
                        and/or deposit patterns that may indicate concerns
                        regarding responsible gaming. We may use automated
                        decision-making processes to help us identify such
                        patterns (legal obligation)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  Data Collection and Automated Decision-Making
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Footi.ai collects a large amount of data from multiple
                  sources, including user registration information, transaction
                  history, betting patterns, gaming data, and demographic
                  details. Through automated decision-making, we can segment our
                  customer base based on various attributes, including gaming
                  habits, preferences, and spending patterns. Automated
                  decision-making systems in the gaming industry can help us
                  meet legal and regulatory requirements. These systems can
                  monitor transactions, perform anti-money laundering checks,
                  and ensure appropriate age verification processes are in
                  place.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">Withdrawing Consent</div>
                <div className="text-xs text-zinc-300 text-justify">
                  If you decide not to provide your personal data or withdraw
                  the previously granted consent, you may prevent us from
                  fulfilling legal obligations, complying with a contract, or
                  providing the necessary services to operate your account. You
                  can withdraw your consent at any time. Not providing your
                  personal data may result in our inability to provide you with
                  products or services.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  Updating Your Information
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  It is important that the information we hold about you is
                  accurate and up-to-date so that we can meet our regulatory
                  obligations and also provide you with the best possible
                  service. Therefore, we ask that you ensure your personal data
                  is updated at all times.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">Data Retention</div>
                <div className="text-xs text-zinc-300 text-justify">
                  The data provided by footi.ai is retained for the period
                  during which you are our customer. If you are no longer a
                  customer of footi.ai, we will retain your data for the minimum
                  period necessary to comply with applicable legal or regulatory
                  obligations. Footi.ai will not retain data beyond ALD/CFT
                  requirements.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  Personal Data Shared with Others
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  The personal information and data provided by you are
                  transferred for our legitimate interest to ALCHEMAX CONSULTING
                  LTDA. Data may only be shared with other Footi companies and
                  with these other organizations:
                  <div className="flex flex-col gap-1 text-xs text-zinc-300">
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Law enforcement agencies, regulators, and other
                        authorities
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Fraud prevention agencies, credit reference agencies
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>Identity verification agencies</div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>Sports governing bodies</div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Third parties with whom you request us to share your
                        data
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Third parties necessary to provide products or services
                        you have requested
                      </div>
                    </div>
                  </div>
                  We will designate certain third parties, including but not
                  limited to analysis companies, advertising agencies, risk and
                  fraud agencies, to process your personal data on our behalf
                  when necessary. These third parties will only process your
                  personal data in accordance with our instructions, and we will
                  ensure that appropriate measures are in place to ensure your
                  personal data is processed only in accordance with this
                  Privacy Policy and is kept secure at all times. Additionally,
                  there may be circumstances in which we are required to
                  disclose your personal data to the relevant competent
                  authorities to respond to specific requests from them.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  Your Rights Regarding Your Personal Data
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Please note that under data protection laws, you have the
                  following rights regarding footi.ai's handling of your
                  personal data:
                  <div className="flex flex-col gap-1 text-xs text-zinc-300">
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Withdraw your previously granted consent at any time;
                        however, this will not invalidate any processing
                        previously consented to. Additionally, withdrawing
                        consent may result in the closure of your account if the
                        withdrawal of consent is not consistent with the legal
                        basis on which we are processing such data.
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        File a complaint with any relevant data protection
                        authority
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Access your personal data that we process: you have the
                        right to request access to the personal data we hold
                        about you. This includes information about the
                        categories of data we process, the purposes for which we
                        process them, and any third party with whom we may share
                        your data.
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Correction of any incorrect or outdated personal data:
                        if you believe that the personal data we hold about you
                        is inaccurate or incomplete, you have the right to
                        request the correction of such data. We will promptly
                        update any incorrect or outdated information to ensure
                        its accuracy.
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Deletion of the personal data we process: you have the
                        right to request the deletion of your personal data in
                        certain circumstances, such as when the data is no
                        longer necessary for the purposes for which it was
                        collected or if you withdraw your consent. However,
                        please note that certain legal obligations or legitimate
                        interests may prevent us from immediately fulfilling
                        your request.
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Right to restrict the processing of your personal data
                        in certain circumstances: in certain situations, you may
                        have the right to request the restriction of the
                        processing of your personal data. This means that we
                        will store your data but will not use or process it for
                        any other purpose unless you provide your consent or the
                        restriction is lifted.
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <Dot />
                      </div>
                      <div>
                        Right to transfer your data to a third party proposed by
                        you: you have the right to request the transfer of your
                        personal data to another service provider in a
                        structured, commonly used, and machine-readable format,
                        where technically feasible. This right applies when the
                        processing of your data is based on your consent or is
                        necessary for the performance of a contract.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bai-bold">
                  Updates and Modifications to the Privacy Policy
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Please note that footi.ai may update this Privacy Policy
                  occasionally, so we recommend reviewing it frequently. If
                  there are material changes to this Privacy Policy, we will
                  make every effort to inform you in advance by email, website
                  notification, or other agreed communication channels, giving
                  you adequate time to consider and understand the changes
                  before they take effect. We will not apply material changes to
                  the Privacy Policy without your consent. If you refuse to
                  accept changes to the Privacy Policy, or otherwise do not
                  accept the changes within the appropriate time frame, we may
                  be unable to continue providing products and services.
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="text-sm flex">
            Terms and conditions (T&Cs)
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-auto">
            <DialogTitle className="text-default font-bai-bold">
              Terms and conditions (T&Cs)
            </DialogTitle>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>1.</div>
                  <div>Introduction</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  These terms and conditions outline the rules and regulations
                  for the use of Footi's services, provided by Alchemax
                  Consulting Ltda, registered under CNPJ number
                  52.411.203/0001-74, with its registered address at R Monsenhor
                  Aderbal Miranda, 875, First Floor, Feira de Santana, Bahia,
                  Brazil.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>2.</div>
                  <div>Eligibility</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  You must be at least 18 years old to use our services. By
                  agreeing to these terms, you represent and warrant that you
                  are of legal age to form a binding contract with Footi.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>3.</div>
                  <div>Services Description</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Footi provides AI-calculated football betting recommendations.
                  Our service is designed to aid your betting decisions, not to
                  be taken as financial advice.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>4.</div>
                  <div>Account Registration</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  You may be required to register an account to access some
                  features of our services. It is your responsibility to
                  maintain the confidentiality of your account information,
                  including your password.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>5.</div>
                  <div>Termination</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach these terms.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>6.</div>
                  <div>Governing Law</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  These terms shall be governed and construed in accordance with
                  the laws of Brazil, without regard to its conflict of law
                  provisions.
                </div>
              </div>
            </div>
            <DialogTitle className="text-default font-bai-bold">
              Cancellation Policy
            </DialogTitle>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>1.</div>
                  <div>Subscription Services</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  You may cancel your subscription at any time via your account
                  settings or by contacting our support at customer@footi.bet.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>2.</div>
                  <div>Refunds</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Refunds are available for subscriptions within the first 14
                  days of the subscription start date. After this period, no
                  refunds will be processed.
                </div>
              </div>
            </div>
            <DialogTitle className="text-default font-bai-bold">
              Privacy Policy
            </DialogTitle>
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>1.</div>
                  <div>Personal Information Collection</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  You may cancel your subscription at any time via your account
                  settings or by contacting our support at customer@footi.bet.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>2.</div>
                  <div>Use of Information</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Refunds are available for subscriptions within the first 14
                  days of the subscription start date. After this period, no
                  refunds will be processed.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>3.</div>
                  <div>Data Protection</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Alchemax Consulting Ltda is committed to protecting your
                  personal information. We implement advanced security measures
                  to safeguard your data from unauthorized access, alteration,
                  or destruction, in line with LGPD requirements.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>4.</div>
                  <div>Sharing of Information</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  We do not sell or rent personal information to third parties.
                  Information may be shared with trusted partners solely to
                  assist us in operating our website, conducting our business,
                  or serving our users, under agreements that ensure the
                  protection of your data as stipulated by the LGPD.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>5.</div>
                  <div>Your Rights</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  Under the LGPD, you have the right to access, correct, delete,
                  or restrict the use of your personal data. You may also object
                  to the processing of your data at any time. To exercise these
                  rights, please contact us at customer@footi.bet.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>6.</div>
                  <div>Data Retention</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  We retain your personal data only as long as necessary for the
                  purposes outlined in this policy or as required by law.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg font-bai-bold">
                  <div>7.</div>
                  <div>Changes to Privacy Policy</div>
                </div>
                <div className="text-xs text-zinc-300 text-justify">
                  We reserve the right to update our privacy policy at any time.
                  Changes will be effective immediately upon posting on this
                  page. We encourage you to review our privacy policy
                  periodically to stay informed about how we are protecting the
                  personal information we collect.
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex gap-3">
          <Image src={x} alt="twitter" />
          <Image src={telegram} alt="telegran" />
          <Image src={instagram} alt="instagram" />
          <Image src={whatsapp} alt="whatsapp" />
        </div>
        <div className="text-[10px]">
          Content on footi.ai is not intended for anybody under 18 years of age.
        </div>
        <div className="flex justify-center gap-5">
          <Image src={image18} alt="+18" />
          <Image src={gametherapy} alt="gametherapy" />
          <Image src={gamecare} alt="gamecare" />
        </div>
      </div>
    </footer>
  )
}
