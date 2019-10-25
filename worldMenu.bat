@ECHO OFF
REM.-- Prepare the Command Processor
SETLOCAL ENABLEEXTENSIONS
SETLOCAL ENABLEDELAYEDEXPANSION
set destination=C:\SpigotMC\world\

:menuLOOP
echo.
echo.= Menu =================================================
echo.
for /f "tokens=1,2,* delims=_ " %%A in ('"findstr /b /c:":menu_" "%~f0""') do echo.  %%B  %%C
set choice=
echo.&set /p choice=Make a choice or hit ENTER to quit: ||GOTO:EOF
echo.Server should be off yo
echo.&call:menu_%choice%
GOTO:menuLOOP

::-----------------------------------------------------------
:: menu functions follow below here
::-----------------------------------------------------------

:menu_1   Copy Hunger Games World 
set source=C:\SpigotMC\worlds\hungerGames\*.*
GOTO:copyFiles

:menu_2   Copy Asteroids Bed Wars World
set source=C:\SpigotMC\worlds\asteroidBedWars\*.*
GOTO:copyFiles

:menu_3   Copy Garden Bed Wars World
set source=C:\SpigotMC\worlds\gardenBedWars\*.*
GOTO:copyFiles

:menu_4   Copy Castle1
set source=C:\SpigotMC\worlds\Castle1\*.*
GOTO:copyFiles

:menu_6   bedWars #1
set source=C:\SpigotMC\worlds\bedWars\*.*
GOTO:copyFiles

:menu_7   Copy Ruin bed wars
set source=C:\SpigotMC\worlds\ruinBedWars\*.*
GOTO:copyFiles

:menu_8   Our bed wars
set source=C:\SpigotMC\worlds\ourBedWars\*.*
copy C:\SpigotMC\worlds\ourBedWars\bedWars.js C:\SpigotMC\scriptcraft\plugins\bedWars.js
GOTO:copyFiles

:menu_9   Run the server
cd C:\SpigotMC
call runServer.bat
GOTO:menuLOOP

:menu_A   Murder Mystery
set source=C:\SpigotMC\worlds\VictEnglandMM\*.*
GOTO:copyFiles

:menu_

:menu_T   Tip
echo.It's easy to add a line separator using one or more fake labels
GOTO:EOF

:menu_C   Clear Screen
cls
GOTO:EOF

:copyFiles
echo remove %destination%
rmdir %destination% /q /s
mkdir %destination%

echo xcopy %source% %destination% /E 
pause
xcopy %source% %destination% /E
GOTO:EOF
