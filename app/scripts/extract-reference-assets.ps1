Add-Type -AssemblyName System.Drawing
$assetRoot = Join-Path $PSScriptRoot '../public/assets'
$referenceRoot = 'C:/Users/LENOVO/Downloads'
$dash = [System.Drawing.Bitmap]::FromFile((Join-Path $referenceRoot 'screencapture-lmsku-ojk-go-id-Dashboard-2026-09-30-09_24_18.png'))
$course = [System.Drawing.Bitmap]::FromFile((Join-Path $referenceRoot 'screencapture-lmsku-ojk-go-id-Course-show-16-acs-2026-09-30-09_29_38.png'))
$activity = [System.Drawing.Bitmap]::FromFile((Join-Path $referenceRoot 'screencapture-lmsku-ojk-go-id-Activity-show-47-2026-09-30-09_29_59.png'))
function Crop($source, $name, $x, $y, $w, $h, $scale = 1) {
  $rect = [System.Drawing.Rectangle]::new([int]($x*$scale),[int]($y*$scale),[int]($w*$scale),[int]($h*$scale))
  $part = $source.Clone($rect, $source.PixelFormat)
  $part.Save((Join-Path $assetRoot "$name.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $part.Dispose()
}
$s = $dash.Width / 524
Crop $course 'lms-logo' 15 6 115 112
Crop $course 'document' 328 369 126 150
Crop $activity 'test' 280 854 121 115
Crop $activity 'video' 296 459 145 109
Crop $course 'points-person' 1394 795 143 156
Crop $dash 'hero' 54 119 445 118 $s
Crop $dash 'learning' 96 972 41 35 $s
Crop $course 'chat' 1635 1643 61 62
Crop $course 'student-header' 1800 20 44 75
Crop $dash 'avatar-header' 483 8 20 21 $s
$xs = @(69,174,279,384)
$ys = @(410,524,639,766)
for($i=0; $i -lt 16; $i++) { Crop $dash "module-$i" $xs[$i%4] $ys[[math]::Floor($i/4)] 94 49 $s }
for($i=0; $i -lt 5; $i++) { Crop $dash "leader-$i" (100+$i*80) 316 30 26 $s }
$axs = @(72,177,282,387)
for($i=0; $i -lt 8; $i++) { Crop $dash "academy-$i" $axs[$i%4] $(if($i -lt 4){1538}else{1692}) 94 56 $s }
Crop $dash 'dashboard-top-reference' 0 0 524 600 $s
$dash.Dispose(); $course.Dispose(); $activity.Dispose()
