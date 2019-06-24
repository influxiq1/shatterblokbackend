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
$env = $_GET['environment'];
if ($env == 'development') $url = 'http://192.169.196.208:7051/getagreementdetailsforpdf?id=' . $id;
else  $url = 'http://192.169.196.208:7050/getagreementdetailsforpdf?id=' . $id;
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
$result = json_decode($response);
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
  
    <h3 style="margin-bottom:0px; font-size: 16px; font-weight: normal; color: #dd42de; font-weight: bold; ">PROMOTIONAL MODEL /EMPLOYMENT /MANAGEMENT AGREEMENT</h3>  
    <h4 style="margin-bottom:0px; font-size: 16px; font-weight: normal; text-align: justify;  ">Employment/Management Agreement, between Shatter Proof Models ("SPM") and (“Model”). This Agreement is to run two (2) quarters from the date signed or when terminated in writing by either the SPM or Model at their discretion within the first (1) quarter this agreement begins.</h4>  
     
 
     
     <table>
        
        <tr>
        <td style="margin-top: 20px; font-size: 14px; color: #111; width: 70%; font-size: 14px;"><b>1.</b> &nbsp; &nbsp; For good and valueable consideration, SPM contracts &nbsp;&nbsp;             (print name) </td>
        <td style=" background: #fff; border: 2px solid #797878; padding: 8px; width: 30%; line-height: 26px;"> ' . $result->shatterblok_sign . ' </td>
    </tr> 
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>2.</b>&nbsp; &nbsp; on the following terms and conditions and will be retained as acting management and or representation. Upon signing this agreement you also engage in full support and promotion of SPM with daily random post on Facebook, Instagram, Twitter, Snapchat and all other levels of social media such as bookings, auditions, jobs and photoshoots that are given to you by SPM.</td></tr>
 
 <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>3.</b>&nbsp; &nbsp; Compensation: SPM shall pay Model per assignment at a pre-agreed upon rate prior to each engagement. SPM shall receive 7% of Model’s paid rate in agency/management fees for assignments of direct or contracted clients of SPM and a 15% of Model’s paid rate in agency/management of non-direct clients of SPM that are given to Model by or negotiated on Model’s behalf by SPM only. These fees must be paid no more than 48 after Model has received Model’s payment unless paid is issued to and by SPM, then it will be deducted before Model is compensated for said assignment. Each engagement will have a written addendum which will only cover that event and shall have no bearing on the status or terms of this contract. At no time shall any representative of the SPM ever ask money prior to an authorized promotional assignment with or for SPM.</td></tr>

 <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>4.</b>&nbsp; &nbsp; Duties and Position: <b>*Please note SPM does not operate, work with or support the adult industry in any shape or form. This includes: Porn, Adult or X-Rated acts, movies, video or printed images.</b> You will not be asked to participate or perform in any way under the circumstances of the adult industry and will not be offered work by SPM to do such work. SPM is hiring Model with in the capacity of working talent in the fields of promotions| modeling, weather it being in spokes modeling, print, runway, or televised media |music videos| acting | creative dance | ADR and VO (voice over). SPM reserves the right to use images, names, likenesses, audio and video of Model in order to promote & introduce Model to clients and the capacity and use must be approved by Model and SPM at all times while agreement is active. SPM also reserves the right to seek and have Model register to be represented by associated modeling and talent agencies.
      <br><br>
      
      SPM will oversee and help select opportunities offered by agencies and will submit Model for jobs that are offered. <span style="color: red;">(*note if agreement is termed with SPM contract with agencies will be termed also.)</span> While Model will represent various products and companies Model are contracted by SPM and Model are not required to take direction from anyone else other than SPM or clients and their lead employees.
 <br><br>
Model may not take any assignment from a client of SPM without prior written consent of SPM. SPM shall have the right to a 20% referral fee or buy out of Model’s professional agreement with SPM for any unauthorized assignment with a client of SPM. Model’s duties may be reasonably modified at the SPM\'s discretion from time to time. SPM reserves the right to be aware of other companies and or assignments Model may be involved with to avoid conflict of interest at any level or capacity. This contract agreement however is non-exclusive, but is binding with SPM and SPM must protect its image and reputation.</td></tr>

 <tr><td></td></tr>
 <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>5.</b>&nbsp; &nbsp;Confidentiality or Proprietary Information: Model agree that, during or after the term of this agreement, not to reveal confidential information, or trade secrets to any person, firm, corporation, or entity of SPM and if done Model submit to any and all legal action against Model by SPM.</td></tr>

 <tr><td></td></tr>
 <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>6.</b>&nbsp; &nbsp;  Model release any and all clients of the SPM from any liability arising from Model’s contracted work with SPM. All clients have contracted SPM to help promote their products only and have no other affiliation. Model will release any and all liability arising from any misuse or mistreatment by a client that SPM has contracted Model for.</td></tr>

 <tr><td></td></tr>
 <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>7.</b>&nbsp; &nbsp; Model will represent SPM and any of the products they represent truthfully and shall make no false claims. Any such claims will result in immediate termination of this agreement and Model employment. Model release SPM, the clients, and their subsidiaries from any liability based on any claims Model make while promoting their products. </td></tr>

<tr><td></td></tr>
 <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>8.</b>&nbsp; &nbsp; Termination of Agreement. Without cause, SPM may terminate this agreement at any time with no advance notice. Upon termination of agreement, all original images, names, likenesses, audio and video will be ceased and no longer used unless specified in writing by Model or if used on website which term 9 of this agreement will be in effect. </td></tr>
<tr><td></td></tr>
 <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>9.</b>&nbsp; &nbsp; Name and Likeness: We shall have the non exclusive world wide right to use and to permit others, likeness, other identification and biographical material concerning Model for the purposes of trade and otherwise without restriction, in connection with our business and products we represent for up to 12 months after termination of this agreement due to time. </td></tr>

 </table>
<br><br><br>
<table>
    <tr>
        <th>Signed In The Month Of</th>
        <th>The Day Of</th>
        <th>In The Year Of</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td style=" background: #fff; border: 2px solid #797878; padding: 5px; line-height: 35px;">&nbsp;&nbsp; ' . date('M', intval($result->shatterblok_agreement_date / 1000)) . '</td>
        <td style=" background: #fff; border: 2px solid #797878; padding: 5px; line-height: 35px;">&nbsp;&nbsp; ' . date('d', intval($result->shatterblok_agreement_date / 1000)) . ' </td>
        <td style=" background: #fff; border: 2px solid #797878; padding: 5px; line-height: 35px;">&nbsp;&nbsp; ' . date('Y', intval($result->shatterblok_agreement_date / 1000)) . ' </td>
    </tr>
</table>
<br><br>
<table>
    <tr>
        <th>SPM Authorized Signature</th>
        <th>Model | Talent Signature</th>
    </tr>
    <br>
    <tr>
        <td style=" background: #fff; border: 2px solid #797878;  ">
            <div style="padding-bottom:20px; ">
            
                 <br>
                By: Shatto Brown<br>
                Its: Chief Executive Officer<br> 
            </div>
        </td>
        <td style=" background: #fff; border: 2px solid #797878;  ">
            <div style="padding-bottom:20px; ">
               <br>
                By: ' . $result->shatterblok_sign . '<br>
                ' . date('d M, Y', intval($result->shatterblok_agreement_date / 1000)) . '
            </div>
        </td>
    </tr>
</table>
</div>
';

$html2 = '

<table>
     <tr>
         <tr style="margin-bottom: 15px; font-size: 35px; color: #000;"><td ><b> Shatto Brown </b></td></tr><br>
    </tr> 
</table>
';

$html3 = '

<table>
     <tr>
         <td style="font-size: 35px;">
             ' . $result->shatterblok_sign . '
        </td>
    </tr> 
</table>

';

$html4 = '
<div>
<br><br><br>
<table>

    <tr><td> <h3 style="margin-bottom:0px; font-size: 16px; font-weight: normal; color: #dd42de; font-weight: bold; ">GUIDELINES</h3></td></tr>
    <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>1.</b>&nbsp; &nbsp; For any reason that you are unable to fulfill an employment opportunity once you have already committed to a job assignment, please call <b>twenty-four (24) hours in advance.*(Emergencies serve as an exception*.)</b></td></tr>
      
  
<tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>2.</b>&nbsp; &nbsp;  For any reason that you are unable to report for an Job assignment due to a lack of transportation, please notify someone immediately within <b>twenty-four (24) hours before your job assignment start time.</b></td></tr>
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>3.</b>&nbsp; &nbsp;  ONLY appropriate company attire will be accepted during hours of work. <span style="color:red;"><b>No exceptions regarding personal hygiene & appearance during hours of work.</b></span></td></tr>
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>4.</b>&nbsp; &nbsp; You must call in start & end times for all assignments if there is not a Shatter Proof lead or manager on site.</td></tr>
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>5.</b>&nbsp; &nbsp; For safety, escort one another to vehicles at all times. Never leave alone and depending on the environment of assignment when going to the restroom you must go in twos.</td></tr>
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>6.</b>&nbsp; &nbsp; At all events/ public appearances, the exchanging of phone numbers/ emails that relates to a personal nature will not be tolerated. <span style="color:red;"><b>Attendees & clients on the job sites need to be treated as consumers/customers and are not for personal opportunities or advancement.</b></span></td></tr>
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>7.</b>&nbsp; &nbsp; If injury accrues during hours of work, please notify supervisor lead immediately. Please do not leave site, if any injuries occur. If assistant is needed call employer & for emergencies, call the Hospital.</td></tr>
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: justify;" colspan="2"><b>8.</b>&nbsp; &nbsp; Any discussions/complaints relating to your pay rate, assignment, coworkers, or employer/company shall be brought to Shatter Proof leads ONLY.</td></tr>
      
      <tr><td></td></tr>
      <tr><td style="margin-top: 20px; font-size: 14px; color: #111; text-align: center;" colspan="2"> <span style="color: red;"><b>*ANY DISCUSSIONS OF PAY RATE AMONGST EACH OTHER WILL NOT BE TOLERATED PERIOD AND WILL RESULT IN IMMIDIATE AND PERMANNT DISMISSAL.</b></span></td></tr>
      
 
  <tr>
  <p>Date </p>
      <td style="border: 2px solid #797878; line-height: 30px; width:25%;">
      ' . date('d M, Y', intval($result->shatterblok_agreement_date / 1000)) . '
      </td>
  </tr>
</table>
 
<table>
    <tr><td></td><td></td></tr>
    <tr>
        <th>SPM Authorized Signature</th>
        <th>Model | Talent Signature</th>
    </tr>
    <br>
    <tr>
        <td style=" background: #fff; border: 2px solid #797878;  ">
            <div style="padding-bottom:20px; ">
            
                 <br>
                By: Shatto Brown<br>
                Its: Chief Executive Officer<br> 
            </div>
        </td>
        <td style=" background: #fff; border: 2px solid #797878;  ">
            <div style="padding-bottom:20px; ">
               <br>
                By: ' . $result->shatterblok_sign . '<br>
                ' . date('d M, Y', intval($result->shatterblok_agreement_date / 1000)) . '  
            </div>
        </td>
    </tr>
</table>

 
 </div> 
  

';

$html5 = '
<table>
 <tr><td></td></tr>
    <tr style="margin-bottom: 15px; font-size: 35px; color: #000;"><td ><b> Shatto Brown </b></td></tr><br>
    <tr><td></td></tr>
 </table>
    
';

$html6 = '
 <table>
      <tr>
          <td style="font-size: 35px;">
              ' . $result->shatterblok_sign . '
         </td>
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


$pdf->SetY(224);
$pdf->SetX(7);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->writeHTML($html2, true, 0, true, true);

$pdf->SetLeftMargin(102);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->SetY(224);
$pdf->writeHTML($html3, true, false, true, false, '');

$pdf->SetLeftMargin(14);
$pdf->SetFont('helvetica');
$pdf->SetY(257);
$pdf->writeHTML($html4, true, false, true, false, '');

$pdf->SetLeftMargin(13);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->SetY(238);
$pdf->writeHTML($html5, true, false, true, false, '');

$pdf->SetLeftMargin(106);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->SetY(244);
$pdf->writeHTML($html6, true, false, true, false, '');
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
