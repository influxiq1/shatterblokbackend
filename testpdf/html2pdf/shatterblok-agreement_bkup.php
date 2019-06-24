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
  <table>
  <tr><td></td></tr>  <tr><td></td></tr>
  <tr>
    <td style="background-color: #111111;">
        <img src="http://shatterblok.com/assets/images/shaterblockLogo.png">
    </td>
  </tr>
    <tr><td></td></tr>
  </table>
  
    <h4 style="margin-bottom:0px; font-size: 16px; font-weight: normal; ">This Affiliate Agreement ("Agreement") contains the complete terms and conditions between Shatter Blok ("Company") and Roxy Test, who wishes to participate in the Shatter Blok Affiliate Program (the "Affiliate Program") as an affiliate of Shatter Blok (an "Affiliate"). Both Company and Affiliate may collectively be referred to as ("Parties"). </h4> <br>
     
     <table><tr><td></td></tr></table>
     <table>
        <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td><b>DEFINITIONS</b></td></tr><br>
        <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">"Affiliate" - The business, individual, or entity applying to or participating in the Affiliate Program, or that displays Shatter Blok’s products and Services and/or promotions on its website, or other means, using an affiliate tracking code in exchange for receiving a commission from Company for sales directly resulting from such display.  <br><br>   
      "Company\'s Products and Services" – digital online community portal focused on live broadcasting services to fans, clothing, and other future opportunities presented by the company. </td></tr> 
      
      <tr><td></td></tr>
       <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b>AFFILIATE RELATIONSHIP</b></td></tr><br>
        <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">The Parties acknowledge that Affiliate will perform their obligations hereunder as an independent contractor or Affiliate and shall not be an employee of Company. It is also expressly understood that Affiliate\'s employees and agents, if any, are not Company\'s employees or agents, and have no authority to bind Company by contract or otherwise. <br><br>

Affiliate agrees they are solely responsible for understanding their rights and obligations as an Affiliate in their geographic area. <br><br>

Company shall not be liable for taxes, worker\'s compensation, unemployment insurance, employers\' liability, employer\'s FICA, social security, withholding tax, or other taxes or withholding for or on behalf of Affiliate or any other person consulted or employed by the Affiliate in performing Services under this Agreement. All such costs shall be Affiliate\'s responsibility. </td></tr>
 
 
 <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> COMPENSATION</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">Affiliate will receive 10% commissions from any products or services sold to their fans/reach/clients on the Company\'s platform. <br><br>

Affiliate will get 5% commissions from any products or services sold by any individual that signs up officially through the affiliate\'s links if they decided to also join as an affiliate of the company. <br><br>

Commissions, as described above, will commence for the lifetime purchase of the fan/reach/client. </td></tr>
 
 
  
 <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> COMMISSION PAYMENTS </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">All commissions accumulated over the amount of $150 are paid out monthly. Commission amounts must be at least $150 USD at the end of the month to be paid out that following month. <br><br>

Affiliate shall provide Company with a w9 form before commissions are paid to affiliate. Affiliate is responsible to providing Company with up-to-date w9 form. Company may provide this digitally or affiliate may be responsible for scanning and sending before first payment is made.</td></tr>

  <tr><td></td></tr>  <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> REPORTS OF QUALIFIED PURCHASES </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">Starting before the month of November 2018, you may log into your affiliate console to review your click through and potential Qualified Purchases statistics daily. The potential Qualified Purchases shown in this report have not been reviewed to confirm they meet all criteria for Qualified Purchases. As such, Commission Fees may not be issued for all Referred Customers that appear in the affiliate console.</td></tr>
     
      <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b>FTC ENDORSEMENT COMPLIANCE </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">It is the intent of Company to treat all of our customers fairly. Accordingly, we require all Company Affiliates to comply with applicable laws, regulations and guidelines concerning advertising and marketing, including without limitation, the Federal Trade Commission (FTC) Endorsement Guides, which require that material connections between advertisers and endorsers be disclosed. This means that all Affiliate Sites (e.g. directories, review/rating websites, blogs, and other websites) and any email or collateral that provide an endorsement or assessment of Shatter Blok\'s Products and Services must prominently disclose the fact that you receive compensation. <br><br>

Company reserves the right to withhold Commission Fees and cancel the affiliate relationship with you should we determine, at our sole discretion, that you are not in compliance with the previously mentioned guide or other FTC regulations or guides that we deem relevant.</td></tr>

 <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> NON­DISCLOSURE </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">The Affiliate agrees to not disclose any of the details in this agreement either implicitly, explicitly, or indirectly to any competing entity, employee of Company or subsidiary, contractor of Company or subsidiary, and client of Company or subsidiary without permission explicitly given by Company. The Affiliate agrees not to disclose details of compensation with any entity without the explicit permission of Company. <br><br>

Affiliate agrees not to disclose or otherwise reveal to any third party the identities, addresses, telephone numbers, facsimile numbers, email address, telex numbers, bank codes, account number, financial reference, or any other entities introduces by Company to the Affiliate without the specific written permission of Company. <br><br>

Confidential Information. The Affiliate agrees that they shall not, directly or indirectly, disclose, disseminate, use for personal benefit, lecture or write articles with respect to, or otherwise publish "confidential information". For purposes of this Agreement, the term "confidential information" means information and know­how disclosed to or known by the Affiliate which relates to the Company or any business idea under development or research by the Company or that constitutes a corporate opportunity of the Company and which information is not generally known in the relevant trade or industry, including without limitation, any document, information, website or other data requiring pass code or password access, trade secrets, proprietary data, customer lists, contractual arrangements, and product and service development. "Confidential information" shall also include any other document or information (whether of the Company or of any supplier or customer of the Company or of any other person with which the Company has an agreement with respect to the confidentiality of information) labeled "confidential", "proprietary", or words of similar import. Upon Termination of the Term hereof, the Affiliate shall return to or leave with the Company, without making or retaining copies thereof, all documents, records, notebooks and similar repositories containing "confidential information".</td></tr>

      <tr><td></td></tr><tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b>INDEMNIFICATION</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">Affiliate shall not be liable for any claim or demand made against Company by any third party. Company shall indemnify Affiliate against all claims, liabilities and costs, including reasonable attorney fees, of defending any third-party claim or suit arising out of the use of the software provided under this agreement. However, the Affiliate hereby agrees to indemnify and hold Company harmless from all liability, damage, loss, cost, expense or other charge resulting directly or indirectly from any act or omission of the Affiliate. It is understood that Affiliate is to use and only use the regulated media for promotion of any sign ups or sales and the Company is not liable for what the affiliate may present outside of these materials. These materials are all available of the website and through the affiliate back office</td></tr>
      
      <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b>STANDARDS AND ETHICS</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">Affiliate will adhere to truth and integrity and will not engage in any deceptive or misleading sales practices.<br><br>

Affiliate will not in any way demean or speak negatively of Company, Company\'s Clients, Company\'s Potential Clients, Any member of Company, Company\'s Competition, or Affiliate\'s Competition. <br><br>

Affiliate will maintain the confidentially of information provided by any prospect or client of Company and will not reveal any such information without the proper consent or exemption of Company.</td></tr>
 <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> GOVERNING LAW AND FORUM</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">This Agreement shall be governed, construed and enforced exclusively in accordance with the laws of the State of Idaho and the laws of the United States of America, without regard to choice of laws or conflict of law provisions thereof that would result in the application of the laws of a different jurisdiction. Any arbitration or litigation between the Parties shall be conducted exclusively in Idaho, and the Parties hereby submit to such exclusive jurisdiction and venue and agree that venue shall be proper in Idaho. Each Party hereby irrevocably waives, to the fullest extent permitted by law, any objection that it may have, whether now or in the future, to the laying of venue in, or to the jurisdiction of, any and each of such courts for the purpose of any such suit, action, proceeding or judgment and further waives any claim that any such suit, action proceeding or judgment has been brought in an inconvenient forum, and each Party hereby submits to such jurisdiction.</td></tr>
     
     <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> X. NOTICES </b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">Any notice required or permitted to be given under this Agreement shall be sufficient if it is in writing and if it is sent by registered mail or certified mail, return receipt requested, to the Employee at his or her residence affixed above, or to the Employer’s principal place of business as affixed above.</td></tr>
     
      <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> ENTIRE AGREEMENT</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">This agreement contains the entire understanding of the Parties and supersedes any and all previous verbal and written agreement or understandings. There are no other agreements, representations or warranties not set forth in this agreement. This agreement will bind, and inure to the benefit of, the Parties and their respective successor and assigns. Any modification, amendment, or waiver of any provision of this agreement may be made only in writing and signed by both Parties. The failure by any party to exercise any rights granted herein upon the occurrence of any event set forth in this agreement shall not constitute a waiver of any such rights upon the occurrence of any such event. In the event any provision of this agreement is held to be in violation of any law, statue, regulation, ordinance, or court order, this agreement shall be deemed modified accordingly and to the extent necessary to comply therewith and shall otherwise continue full force and effect.</td></tr>
     
      <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> AGREEMENT EXECUTION</b></td></tr><br>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">This digital signature constitutes the full legal agreement between company and affiliate. This agreement may be executed in several counterparts, each of which shall constitute one and the same instrument. Section or paragraph headings in the agreement are for convenience of reference only.<br>
In witness whereof, the Parties hereto have caused this Agreement to be duly executed and entered into as of the date first above written.</td></tr>
 
 <tr><td></td></tr> 
    <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d;"><td ><b> SHATTER BLOK</b></td></tr><br/><br/>
    
    
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">By: Shatto Brown<br>
Its: Chief Executive Officer</td></tr>
  <tr><td></td></tr>
     <tr><td></td></tr>
  <tr style="margin-bottom: 15px; font-size: 18px; color: #e31e6d; line-height: 40px;"><td ><b> AFFILIATE </b></td></tr>
     <tr><td style="margin-top: 20px; font-size: 14px; color: #111;">&nbsp;By: </td></tr>
    </table>
 </div> 
  

';

$html2='
<table>
<tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 35px; color: #000;"><td ><b> Shatto Brown </b></td></tr><br>
    <tr><td></td></tr>
</table>
    
';

$html3='
<table>
     <tr>
         <td style="font-size: 30px;">
             '.$result->shatterblok_sign.'
        </td>
    </tr> 
</table>
';


$html4='
<table>
     <tr>
         <td>  '.date('d M, Y',intval($result->shatterblok_agreement_date/1000)).' </td>
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

$pdf->SetY(217);
$pdf->SetX(10);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->writeHTML($html3, true, 0, true, true);

$pdf->SetLeftMargin(5);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->SetY(172);
$pdf->writeHTML($html2, true, false, true, false, '');

$pdf->SetLeftMargin(14);
$pdf->SetFont('helvetica');
$pdf->SetY(227);
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
