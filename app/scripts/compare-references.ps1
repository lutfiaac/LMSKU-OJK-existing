Add-Type -AssemblyName System.Drawing
$refs=@{dashboard='Dashboard-2026-09-30-09_24_18';category='Course-show-16-acs-2026-09-30-09_29_38';activities='Activity-show-47-2026-09-30-09_29_59';detail='Activity-detail-2026-09-30-09_30_28'}
foreach($name in $refs.Keys){
 $a=[System.Drawing.Bitmap]::FromFile("C:/Users/LENOVO/Downloads/screencapture-lmsku-ojk-go-id-$($refs[$name]).png")
 $b=[System.Drawing.Bitmap]::FromFile((Join-Path $PSScriptRoot "../evidence/local-$name.png"))
 $height=[Math]::Max($a.Height,$b.Height)
 $canvas=[System.Drawing.Bitmap]::new(1920,[int]($height/2))
 $g=[System.Drawing.Graphics]::FromImage($canvas);$g.Clear([System.Drawing.Color]::LightGray)
 $g.DrawImage($a,0,0,960,[int]($a.Height/2));$g.DrawImage($b,960,0,960,[int]($b.Height/2))
 $canvas.Save((Join-Path $PSScriptRoot "../evidence/compare-$name.png"))
 if($name -eq 'dashboard'){$focus=$canvas.Clone([System.Drawing.Rectangle]::new(0,0,1920,1080),$canvas.PixelFormat);$focus.Save((Join-Path $PSScriptRoot '../evidence/compare-dashboard-top.png'));$focus.Dispose()}
 $g.Dispose();$canvas.Dispose();$a.Dispose();$b.Dispose()
}
