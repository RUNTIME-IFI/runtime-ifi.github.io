import React from 'react'

const Report: React.FC = () => {
  return (
    <div className="page-container">
      <section className="runtime-section report-page">
        <h2 className="section-title">VARSLING I IFI RUNTIME</h2>
        
        <div className="report-content">
          <p className="section-text">
            IFI Runtime skal være en trygg forening der alles integritet og grenser respekteres. Vi tar avstand fra alle former for diskriminering, trakassering og mobbing. Alle må følge foreningens vedtekter/retningslinjer, vedtak og norsk lov.
          </p>
          
          <p className="section-text">
            Dersom du opplever noe som strider mot våre retningslinjer vil vi at du varsler. Når du varsler, får vi mulighet til å håndtere det som har skjedd og hindre at det skjer igjen.
          </p>
          
          <div className="report-meta">
            <p><strong>Vedtatt:</strong> Stiftelsesmøte for IFI Runtime, 30.09.2025</p>
            <p><strong>Gjelder fra:</strong> 30.09.2025</p>
            <p><strong>Sist oppdatert:</strong> 30.09.2025</p>
          </div>

          <h3 className="report-subtitle">HVA ER ET VARSEL?</h3>
          <p className="section-text">
            Å varsle er å gi beskjed om skadelige, farlige, uetiske eller straffbare hendelser eller forhold. Alle medlemmer, tillitsvalgte, frivillige og deltakere på våre aktiviteter kan varsle.
          </p>

          <h3 className="report-subtitle">HVA KAN JEG VARSLE OM?</h3>
          <p className="section-text">
            Du kan varsle om noe du selv har opplevd, sett, blitt fortalt eller fått kjennskap til, som du mener er uetisk eller ulovlig – uavhengig av om personen er medlem, tillitsvalgt eller deltaker på en aktivitet i regi av IFI Runtime.
          </p>
          
          <div className="report-examples">
            <h4>EKSEMPLER:</h4>
            <ul>
              <li>Brudd på foreningens vedtekter, retningslinjer eller vedtak</li>
              <li>Lovbrudd</li>
              <li>Mobbing, seksuell trakassering, overgrep, rasisme eller diskriminering</li>
              <li>Økonomisk mislighold og korrupsjon</li>
            </ul>
          </div>

          <h3 className="report-subtitle">HVEM KAN VARSLE?</h3>
          <p className="section-text">
            Alle som har tilknytning til foreningen eller våre arrangementer: medlemmer, frivillige, deltakere og samarbeidspartnere.
          </p>

          <h3 className="report-subtitle">SLIK VARSLER DU</h3>
          <p className="section-text">
            Du kan varsle skriftlig eller muntlig. Beskriv det som har skjedd, så konkret du kan (hva, hvor, når, hvem – hvis mulig), og legg ved dokumentasjon/skjermbilder dersom du har.
          </p>
          
          <div className="contact-channels">
            <h4>KONTAKTKANALER:</h4>
            <ul>
              <li><strong>E-post:</strong> runtimeifi@gmail.com</li>
            </ul>
            <p className="section-text">
              Du kan også be om hjelp fra SiO Foreninger, Studentombudet ved UiO eller andre du stoler på. Ved akutt fare, kontakt 112.
            </p>
          </div>

          <h3 className="report-subtitle">ANONYM VARSLING</h3>
          <p className="section-text">
            Det er mulig å varsle anonymt. Vær oppmerksom på at anonymitet kan gjøre det vanskeligere å innhente nok informasjon til å gå videre. Det er likevel bedre å varsle anonymt enn å la være.
          </p>

          <h3 className="report-subtitle">ETTER AT DU HAR VARSLET</h3>
          <div className="process-steps">
            <div className="step">
              <strong>Bekreftelse:</strong> Du kontaktes innen én uke av de som behandler varslet, med informasjon om videre prosess.
            </div>
            <div className="step">
              <strong>Samtale:</strong> Du kan bli invitert til møte for å sikre korrekt forståelse. Du kan ta med en støtteperson. Det skrives referat som du får lese og godkjenne.
            </div>
            <div className="step">
              <strong>Kontradiksjon:</strong> Den/de det er varslet om blir innkalt til eget møte for å gi sin forklaring.
            </div>
            <div className="step">
              <strong>Vurdering:</strong> Styret vurderer om forholdet innebærer brudd på lov eller på foreningens retningslinjer.
            </div>
            <div className="step">
              <strong>Ved straffbare forhold:</strong> Saken meldes til politiet som etterforsker og avgjør videre.
            </div>
            <div className="step">
              <strong>Ved brudd på interne regler:</strong> Varslingsrutinene våre følges, og det kan fattes vedtak om reaksjoner (f.eks. advarsel, suspensjon fra arrangementer, eller eksklusjon).
            </div>
            <div className="step">
              <strong>Oppfølging:</strong> Alle parter får tilbud om oppfølging. Du holdes orientert om fremdrift så langt taushetsplikten tillater.
            </div>
          </div>

          <h3 className="report-subtitle">KONFIDENSIALITET OG PERSONVERN</h3>
          <p className="section-text">
            Varslingssaker behandles fortrolig. Informasjon deles bare med personer som trenger den for å håndtere saken. Personopplysninger behandles i tråd med gjeldende regelverk. Dokumentasjon lagres sikkert og kun så lenge det er nødvendig.
          </p>

          <h3 className="report-subtitle">INHABILITET OG UAVHENGIGHET</h3>
          <p className="section-text">
            Personer som er direkte berørt eller kan være inhabile deltar ikke i behandlingen av saken. Ved behov kan styret benytte ekstern bistand (f.eks. Studentombudet eller juridisk rådgiver).
          </p>

          <h3 className="report-subtitle">KLAGE</h3>
          <p className="section-text">
            Dersom du mener det er gjort feil i prosessen, eller at reaksjonen ikke står i forhold til hendelsen, kan du klage til styret innen tre uker etter mottatt vedtak. Klagen behandles av et habil styre eller av ekstern instans dersom styret er inhabilt. Nærmere prosedyre beskrives i Varslingsrutiner for IFI Runtime.
          </p>

          <h3 className="report-subtitle">VIL DU VITE MER?</h3>
          <p className="section-text">
            Ta kontakt med styret.
          </p>
          
          <div className="report-footer">
            <p><em>Basert på LNU sin varslingsplakat (trygg.lnu.no).</em></p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Report