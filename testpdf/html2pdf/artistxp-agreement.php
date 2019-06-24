<?php
//============================================================+
// File name   : example_003.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 003 for TCPDF class
//               Custom Header and Footer
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Custom Header and Footer
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
require_once('tcpdf/examples/tcpdf_include.php');

//require_once('tcpdf_include.php');
class MYPDF extends TCPDF
{
    // Page footer
    public function Footer()
    {
        // Position at 15 mm from bottom
        $this->SetY(30);
        $this->SetX(28);
        // Set font
        //$this->SetFont('helvetica', 8);
        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, $this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, 'Confidentiality Agreement', 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}


$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// create new PDF document
//$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
/*$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 021');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');*/

// set default header data
/*$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 021', PDF_HEADER_STRING);*/

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);

$pdf->SetLeftMargin(8);
$pdf->SetRightMargin(8);

//$pdf->SetY(50);


$pdf->setPrintHeader(false);
//$pdf->setPrintFooter(false);

$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);


// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__) . '/lang/eng.php')) {
    require_once(dirname(__FILE__) . '/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
//$pdf->SetFont('helvetica', '', 9);
//$pdf->SetFont('helvetica');


// add a page
$pdf->AddPage();

$id = $_GET['id'];
$env=$_GET['environment'];
if($env=='development') $url='http://192.169.196.208:7051/getagreementdetailsforpdf?id='.$id;
else  $url='http://192.169.196.208:7050/getagreementdetailsforpdf?id='.$id;
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers = [];
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
$result=json_decode($response);
$result = $result->res;
// create some HTML content
/*$html = '<h1>Example of HTML text flow</h1>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <em>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</em> <em>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</em><br /><br /><b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i><br /><br /><b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u>';*/


$html = '

<div>


    <!--Agreement-->
 
   
   
   <h3 style="background-color: #111111; text-align: center;">
        <tr><td></td></tr>
        <img src="https://developmentbackoffice.shatterblok.com/assets/images/artistheaderlogo.png">
    </h3> 
        <p style="font-size: 26px; background-color: #ff1493; color: #fff; "><tr><td></td></tr> <span style="text-align: center; font-weight: bold;  ">ArtistXP Affiliate Program Agreement</span></p>
   <br>
   
    <h4 style="margin-bottom:0px; font-size: 16px; font-weight: normal; text-align: justify;">By participating or attempting to participate in the ArtistXP Corp. (“ArtistXP”) marketing affiliate program (the “Affiliate Program”), you agree to this ArtistXP Affiliate Program Agreement (this “Agreement”). You acknowledge and agree that you have read, understand and agree to be bound by all of the terms and conditions of this Agreement, as well as all other applicable rules or policies provided by ArtistXP from time to time, including without limitation, the ArtistXP Terms of Use and Privacy Policy (collectively, the “ArtistXP Policies”), which are incorporated herein by reference and may be changed from time to time in ArtistXP’s sole and absolute discretion, and understand that you are entering into a legally binding agreement with ArtistXP. <br><br>

ArtistXP reserves the right to change and/or modify this Agreement at any time in its sole discretion by posting a change notice or revised Agreement on www.artistxp.com (or any corresponding web page thereof) (the “ArtistXP Site”) or via your Affiliate Account (as defined below) or by sending notice of such modification to you by email to the primary email address then-currently associated with your Affiliate Account. The effective date of such change will be the date specified in such notice. YOUR CONTINUED PARTICIPATION IN THE AFFILIATE PROGRAM FOLLOWING THE EFFECTIVE DATE OF SUCH CHANGE WILL CONSTITUTE YOUR ACCEPTANCE OF THE MODIFICATIONS. IF ANY MODIFICATION IS UNACCEPTABLE TO YOU, YOUR ONLY RECOURSE IS TO TERMINATE THIS AGREEMENT IN ACCORDANCE WITH SECTION 6.</h4> <br>
     
     <table><tr><td></td></tr></table>
     <table>
        <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td><b>The Affiliate Program</b></td></tr><br>
        <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">The Affiliate Program provides the opportunity to earn commissions on qualifying purchases of tickets to view an Audio Deadline live-streamed event (an “Event”) online on the ArtistXP Site as follows, subject to and in accordance with the terms and conditions of this Agreement:</td></tr> 
        <ol>
            <li>ArtistXP will provide unique tracking link(s) (which may include shared media links) to the ArtistXP Site (“Links”), which you may place on websites or social media user-generated content (collectively, “Sites”) that you own and/or control.</li><br>
            <li>For each person who arrives on the ArtistXP Site by clicking on a Link on one of your Sites (each, a “Direct Referred Customer”) and completes a Qualifying Purchase, you will earn a commission of 10% of the Net Receipts attributable thereto. A “Qualifying Purchase” occurs when a person arrives on the ArtistXP Site by clicking on a Link on your Site or the Site of a Direct Referred Affiliate or Indirect Referred Affiliate (as applicable), and, in the same transaction, purchases a ticket to an Event. “Net Receipts” means the monies actually received by ArtistXP from a Qualifying Purchase, less any chargebacks (and associated fees), credits, refunds, credit card processing fees and taxes (e.g., sales tax, VAT, etc.).</li><br>
            <li>If a Direct Referred Customer participates in the Affiliate Program (any such Direct Referred Customer, a “Direct Referred Affiliate”), then, for each person who arrives on the ArtistXP Site by clicking on a Link on the Direct Referred Affiliate’s Site (each, an “Indirect Referred Customer”) and completes a Qualifying Purchase, you will earn a commission of 5% of the Net Receipts attributable thereto.</li>
        </ol>
      
      
       <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> Enrollment Process</b></td></tr><br>
        <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;"> You may apply to participate in the Affiliate Program via https://artistxp.com/. ArtistXP may reject your application for any reason, in ArtistXP’s sole discretion. If your application is accepted, ArtistXP will notify you of the same via email to the email address provided in your application and provide you with a link that will enable you to create an affiliate account on the ArtistXP Site (your “Affiliate Account”). In order to participate in the Affiliate Program and receive Commissions as described in this Agreement, you must register for an Affiliate Account. </td></tr>
 
 
 <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> Payment</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">Commissions are payable on a monthly basis, within seven days following the end of the applicable month, provided that Commissions will not be paid out until (a) the aggregate amount of the Commissions exceeds $100 and (b) you make a request for such payment through your Affiliate Account. Payment will be made to you in accordance with the payment details you enter in your Affiliate Account. ArtistXP will make reporting regarding your Commissions available to you via your Affiliate Account. You will be solely responsible for all taxes, costs and expenses related to your participation in the Affiliate Program. If you choose to be paid via ACH (if presented as a payment option in your Affiliate Account), a transaction fee of $1.00 per payment transaction will be deducted from the payment amount.</td></tr>
 
 
  
 <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> Identifying Yourself as an Affiliate </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">You must clearly state the following on your Site: “As an ArtistXP Affiliate I earn from qualifying purchases.” Except for this disclosure, you will not make any public communication with respect to this Agreement or your participation in the Affiliate Program without ArtistXP’s advance written permission. You will not misrepresent or embellish your relationship with ArtistXP (including by expressing or implying that ArtistXP supports, sponsors, or endorses you), or express or imply any affiliation between ArtistXP and you or any other person or entity except as expressly permitted by this Agreement. You must not make inaccurate, overbroad, deceptive or otherwise misleading claims about any Event, the ArtistXP Site, or any of ArtistXP’s products or services. You are solely responsible for your Site, including the operation thereof and all materials that appear on or within it.</td></tr>

  <tr><td></td></tr>  <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b>Promotional Limitations</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">You will not engage in any promotional, marketing, or other advertising activities on behalf of ArtistXP or its affiliates, or in connection with the ArtistXP Site or Affiliate Program, that are not expressly permitted under the Agreement. You will not engage in any promotional, marketing, or other advertising activities in any offline manner, including by using any of ArtistXP or its affiliates’ trademarks or logos, or any Material (as defined below) in connection with email, offline promotion or in any offline manner.</td></tr>
     
      <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b>Term and Termination </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">The term of this Agreement will begin upon your registration for the Affiliate Program. Either you or ArtistXP may terminate this Agreement at any time, with or without cause, by giving the other party written notice of termination provided that the effective date of such termination will be seven days from the date notice is provided. You can provide termination notice by logging into your Affiliate Account and selecting the option to close your account. In addition, ArtistXP may terminate this Agreement immediately at any time upon written notice to you in the event that: (a) you are in material breach of this Agreement or you are in non-material breach of this Agreement but you do not remedy it within seven days from receipt of ArtistXP’s notice of such breach; (b) ArtistXP believes that it may face potential claims or liability in connection with your participation in the Affiliate Program; (c) ArtistXP believes that its brand or reputation may be tarnished by you or in connection with your participation in the Affiliate Program; (d) ArtistXP believes that it is or may become subject to tax collection requirements in connection with this Agreement or the activities performed by either party under this Agreement; (e) ArtistXP has previously terminated this Agreement with respect to you or other persons that ArtistXP determines are affiliated with you or acting in concert with you for any reason; or (f) ArtistXP has terminated the Affiliate Program as it generally makes it available to participants. <br><br>

Upon any termination of this Agreement, all rights and obligations of the parties will be terminated, including any and all licenses granted in connection with this Agreement, except that the rights and obligations of the parties under Sections 7 through 12 of this Agreement and as specified in the Program Policies, together with any then-payable but unpaid payment obligations under this Agreement, will survive the termination of this Agreement. No termination of this Agreement will relieve either party for any liability for any breach of, or liability accruing under, this Agreement prior to termination.</td></tr>

 <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> Intellectual Property</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">ArtistXP owns all right, title and interest in and to the Events, ArtistXP Site and ArtistXP’s products and services and related developments, enhancements and revisions, intellectual property rights and/or proprietary rights therein and related thereto. In order to facilitate your advertisement of the Events, ArtistXP may make available to you data, images, text, link formats, widgets, links, marketing content, and other linking tools, application program interfaces, and other information in connection with the Affiliate Program (collectively with the Links, “Materials"). “Materials” specifically excludes any data, images, text, or other information or content relating to product offerings on any site other than the ArtistXP Site. <br><br>

During the term of this Agreement, ArtistXP hereby grants to you a non-transferable, non-exclusive, limited license to use ArtistXP’s name and those logos and/or trademarks provided to you by ArtistXP (collectively, the “Trademarks”) and the Materials in accordance with this Agreement solely in relation to the performance of the services described herein. Your use of such Trademarks and Materials shall be in accordance with ArtistXP’s policies and procedures established from time to time. You shall not do and/or cause to be done any act and/or anything contesting and/or in any way impairing and/or reducing ArtistXP’s right, title and interest in the Trademarks and/or Materials. ArtistXP has the right to discontinue and/or alter the form, shape and/or artwork of the Trademarks and/or content of the Materials. You acknowledge that your use of the Trademarks and/or Materials shall not create any right, title and interest, in or to the Trademarks and/or Materials and all such uses inure to the benefit of ArtistXP. ArtistXP reserves the right at any time to review your use of the Trademarks and/or Materials to determine if such use is in compliance with this Agreement. In the event ArtistXP desires to include your information on its affiliate program website at any time during the term of this Agreement, you hereby grant to ArtistXP a non-transferable, non-exclusive, limited license to use the logos and/or trademarks provided by you on such website.

</td></tr>

      <tr><td></td></tr><tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b>Confidentiality</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">You will keep all proprietary information related to the business of ArtistXP and any of its affiliates, clients and other third parties to which you have access, whether in oral, written, graphic and/or machine-readable form, in the course of or in connection with this Agreement (collectively, the “Confidential Information”) confidential and will only use such Confidential Information to perform your obligations under this Agreement. You may disclose the Confidential Information only to those who have a need to know such Confidential Information solely in connection with this Agreement; provided that you assume full responsibility for any failure to comply with this Agreement. You acknowledge that a breach of the obligations related to Confidential Information may result in irreparable and continuing damage to ArtistXP for which monetary damages may not be sufficient, and you agree that ArtistXP will be entitled to seek, in addition to its other rights and remedies hereunder or at law, injunctive or all other equitable relief, and such further relief as may be proper from a court of competent jurisdiction.</td></tr>
      
      <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b>Representations and Warranties</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">You represent, warrant, and covenant that (a) you will participate in the Affiliate Program and create, maintain, and operate your Site in accordance with this Agreement, (b) your participation in the Affiliate Program and your creation, maintenance, and operation of your Site will comply with all applicable laws, ordinances, rules, regulations, orders, licenses, permits, guidelines, codes of practice, industry standards, self-regulatory rules, judgments, decisions, or other requirements of any governmental authority that has jurisdiction over you (including all such rules governing communications, data protection, advertising, and marketing), including, without limitation, the Federal Trade Commission Endorsement Guides, and all laws relating to privacy and data security, (c) you are at least 18 years old (or the applicable age of majority in your jurisdiction), (d) you have independently evaluated the desirability of participating in the Affiliate Program and are not relying on any representation, guarantee, or statement other than as expressly set forth in this Agreement, (e) will comply with all U.S. or other export and re-export restrictions that may apply to goods, software, technology and services, and (f) the information you provide in connection with the Affiliate Program is accurate and complete at all times. <br><br>

    <b>ArtistXP does not make any representation, warranty, or covenant regarding the amount of traffic or fees you can expect at any time in connection with the Affiliate Program. EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER PARTY MAKES ANY OTHER WARRANTY, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE. THE AFFILIATE PROGRAM, THE ARTISTXP SITE, ANY PRODUCTS AND SERVICES OFFERED THEREON, ANY LINKS, LINK FORMATS, CONTENT, PRODUCT ADVERTISING CONTENT, ARTISTXP AND ITS AFFILIATES’ DOMAIN NAMES, TRADEMARKS AND LOGOS, AND ALL TECHNOLOGY, SOFTWARE, FUNCTIONS, MATERIALS, DATA, IMAGES, TEXT, AND OTHER INTELLECTUAL PROPERTY RIGHTS, INFORMATION AND CONTENT PROVIDED OR USED BY OR ON BEHALF OF ARTISTXP OR ITS AFFILIATES OR LICENSORS IN CONNECTION WITH THE AFFILIATE PROGRAM (COLLECTIVELY THE “SERVICE OFFERINGS”) ARE PROVIDED “AS IS” AND “AS AVAILABLE”. ARTISTXP MAY DISCONTINUE ANY SERVICE OFFERING, OR MAY CHANGE THE NATURE, FEATURES, FUNCTIONS, SCOPE, OR OPERATION OF ANY SERVICE OFFERING, AT ANY TIME AND FROM TIME TO TIME. NEITHER ARTISTXP NOR ANY OF ITS AFFILIATES OR LICENSORS WARRANT THAT THE SERVICE OFFERINGS WILL CONTINUE TO BE PROVIDED, WILL FUNCTION AS DESCRIBED, CONSISTENTLY OR IN ANY PARTICULAR MANNER, OR WILL BE UNINTERRUPTED, ACCURATE, ERROR FREE, OR FREE OF HARMFUL COMPONENTS. NEITHER ARTISTXP NOR ANY OF ITS AFFILIATES OR LICENSORS WILL BE RESPONSIBLE FOR (A) ANY ERRORS, INACCURACIES, VIRUSES, MALICIOUS SOFTWARE, OR SERVICE INTERRUPTIONS, INCLUDING POWER OUTAGES OR SYSTEM FAILURES OR (B) ANY UNAUTHORIZED ACCESS TO OR ALTERATION OF, OR DELETION, DESTRUCTION, DAMAGE, OR LOSS OF, YOUR SITE OR ANY DATA, IMAGES, TEXT, OR OTHER INFORMATION OR CONTENT. NOTHING IN THIS PARAGRAPH WILL OPERATE TO EXCLUDE OR LIMIT WARRANTIES, LIABILITIES, OR REPRESENTATIONS THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</b></td></tr>
 <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b>Indemnification</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">You will indemnify, defend and hold harmless ArtistXP, its officers, associates, employees, contractors and agents from and against any and all claims, damages, liabilities, losses, costs, demands and expenses (including reasonable attorneys’ fees and costs of litigation) arising out of or relating to (a) your Site or any materials that appear on your Site, including the combination of your Site or those materials with other applications, content, or processes, (b) your or your employees’ or contractors’ negligent act and/or omission or willful misconduct; (c) any misrepresentation by you related to ArtistXP’s products and services(s), (c) your breach of this Agreement (including any of the ArtistXP Policies) or (d) violation of any applicable law, rule, regulation, or order of any governmental (including any regulatory or quasi-regulatory) agency or contract.</td></tr>
     
     <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b>Dispute Resolution </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">Any dispute relating in any way to the Affiliate Program and/or this Agreement (including any actual or alleged breach hereof), whether arising in contract, statute, tort, fraud, misrepresentation, discrimination, common law or any other legal theory, including, but not limited to disputes relating to the making, performance or interpretation of this Agreement, shall be subject to binding arbitration, to be held in New York, New York, in accordance with the Federal Arbitration Act and with the Commercial Rules then in effect of the American Arbitration Association (“AAA”) available at www.adr.org. In any arbitration proceeding conducted pursuant to this Section, the parties shall have the right to discovery, to call witnesses, and to cross-examine the other party’s witnesses. The arbitrator shall render a final decision in writing, setting forth the reasons for the arbitration award. Both parties are bound by this agreement to arbitrate. THE PARTIES WAIVE THEIR RIGHT TO HAVE ANY SUCH DISPUTE, CLAIM OR CONTROVERSY DECIDED BY A JUDGE OR JURY IN A COURT. THE PARTIES ALSO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN THEIR INDIVIDUAL CAPACITIES, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, REPRESENTATIVE OR COLLECTIVE PROCEEDING. If either party initiates or joins in a lawsuit or arbitration against the other party in violation of this waiver and a court or arbitrator deems the waiver to be unenforceable for any reason, then to the extent the waiver is invalidated, claims subject to the invalidated waiver shall no longer be subject to arbitration, but shall instead proceed in court, with all remaining claims remaining subject to arbitration. To the extent claims subject to the invalidated waiver depend upon resolution of the same or similar facts as the claims to be arbitrated, the parties agree that such claims shall be stayed in court pending resolution of the arbitration. This agreement to arbitrate claims does not include disputes, controversies or differences which may not by law be arbitrated. Notwithstanding anything to the contrary in this Agreement, ArtistXP may seek injunctive or other relief in any state, federal, or national court of competent jurisdiction for any actual or alleged infringement of ArtistXP’s or any other person or entity’s intellectual property or proprietary rights. You further acknowledge and agree that ArtistXP’s rights in the Materials are of a special, unique, extraordinary character, giving them peculiar value, the loss of which cannot be readily estimated or adequately compensated for in monetary damages.</td></tr>
     
      <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> Miscellaneous </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;">Nothing contained in this Agreement shall create or imply any agency relationship between the parties, nor shall this Agreement be deemed to constitute a joint venture or partnership between the parties. It is further understood and agreed that your relationship with ArtistXP is and shall continue to be that of an independent contractor and you shall not be entitled to receive employee benefits from ArtistXP and you are responsible for the payment of all taxes and withholdings specified by law, which may be due in regard to payments made by ArtistXP. No waiver of any of the terms of this Agreement by either party will be valid unless agree to in writing and designated as such. Any forbearance or delay on the part of either party in enforcing any of its rights under this Agreement will not be construed as a waiver of such right to enforce same for such occurrence or any other occurrence. If any one or more of the provisions of this Agreement are for any reason held to be invalid, illegal or unenforceable by a court of competent jurisdiction, the remaining provisions of this Agreement will be unimpaired and will remain in full force and effect. The headings and titles of the paragraphs of this Agreement are for convenience only and are not intended to define, limit or construe the contents of the provisions contained herein. You may not assign, as a result of a change of control or by operation of law or otherwise, your rights and/or obligations under this Agreement without the prior written consent of ArtistXP. This Agreement will be binding upon the parties and their respective legal successors and permitted assigns. This Agreement will be governed by, and construed in accordance with, the internal laws of the State of New York, without regard to its choice of laws principles. Any action related to or arising from this Agreement that is an exception to the arbitration process described herein shall take place exclusively in the courts situated in New York, New York and the parties hereby submit to the venue of the courts situated therein. This Agreement constitutes the complete agreement and understanding between the parties with respect to the subject matter hereof, and supersedes all prior agreements and understandings between the parties. This Agreement may be delivered and executed electronically using electronic signature or by other electronic communication used by the parties.</td></tr>
     
       
 <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> Artistxp CORP</b></td></tr><br>
    <tr><td > </td></tr><br>
    <tr><td > </td></tr><br>
     <tr>
     <td style="margin-top: 20px; font-size: 14px; color: #111;">
         By: Beto Paredes<br>
         Its: Chief Executive Officer
     </td></tr>
  <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> AFFILIATE </b></td></tr><br>
     <tr><td>  </td></tr><br><tr><td>  </td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">&nbsp; By:  '.$result->audiodeadline_sign.'</td></tr>
    </table>
 </div>  
  

';
$html2='
<table>
     <tr>
         <td style="font-size: 30px;">
              Beto Paredes
        </td>
    </tr> 
</table>
';

$html3='
<table>
     <tr>
         <td style="font-size: 30px;">
             '.$result->audiodeadline_sign.' 
        </td>
    </tr> 
</table>
';


$html4='
<table>
     <tr>
         <td>  '.date('d M, Y',intval($result->audiodeadline_agreement_date/1000)).' </td>
    </tr> 
</table>
';

// output the HTML content
$pdf->SetY(0);
//$pdf->SetX(0);
//$pdf->writeHTML($html.$html2.$html3, true, 0, true, true);
//$pdf->writeHTML($html, true, false, true, false, '');



//$pdf->SetFont('helvetica');
$pdf->writeHTML($html, true, false, true, false, '');

$pdf->SetY(213);
$pdf->SetX(3);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->writeHTML($html2, true, 0, true, true);

$pdf->SetY(251);
$pdf->SetX(3);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->writeHTML($html3, true, 0, true, true);

$pdf->SetLeftMargin(7);
$pdf->SetFont('helvetica');
$pdf->SetY(266);
$pdf->writeHTML($html4, true, false, true, false, '');


/*$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 30);

$pdf->SetFont($fontname, '', 25, '', false);
$pdf->writeHTML($html2, true, 0, true, true);

//$pdf->SetFont('helvetica');
$pdf->writeHTML($html3, true, false, true, false, '');*/

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('nexgenpdf.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
