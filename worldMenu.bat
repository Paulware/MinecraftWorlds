@ECHO OFF
REM.-- Prepare the Command Processor
SETLOCAL ENABLEEXTENSIONS
SETLOCAL ENABLEDELAYEDEXPANSION
set destination=C:\SpigotMC\world\
set blocklyroot=C:\
set worldsroot=C:\SpigotMC
set arduinoroot=C:\


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
set source=C:\SpigotMC\MinecraftWorlds\hungerGames\*.*
GOTO:copyFiles

:menu_2   Copy Asteroids Bed Wars World
set source=C:\SpigotMC\MinecraftWorlds\asteroidBedWars\*.*
GOTO:copyFiles

:menu_3   Copy Garden Bed Wars World
set source=C:\SpigotMC\MinecraftWorlds\gardenBedWars\*.*
GOTO:copyFiles

:menu_4   Copy Castle1
set source=C:\SpigotMC\MinecraftWorlds\Castle1\*.*
GOTO:copyFiles

:menu_7   Copy Ruin bed wars
set source=C:\SpigotMC\MinecraftWorlds\ruinBedWars\*.*
GOTO:copyFiles

:menu_8   Our bed wars
set source=C:\SpigotMC\MinecraftWorlds\ourBedWars\*.*
copy C:\SpigotMC\MinecraftWorlds\ourBedWars\bedWars.js C:\SpigotMC\scriptcraft\plugins\bedWars.js
copy C:\SpigotMC\MinecraftWorlds\ourBedWars\autoMinecartGame.js C:\SpigotMC\scriptcraft\plugins\autoMinecartGame.js
GOTO:copyFiles

:menu_9   Run the server
cd C:\SpigotMC
call runServer.bat
GOTO:menuLOOP

:menu_A   Murder Mystery
set source=C:\SpigotMC\worlds\VictEnglandMM\*.*
GOTO:copyFiles

:menu_B   Set Backups as destination
set blocklyroot=C:\backups
set worldsroot=C:\backups
set arduinoroot=C:\backups
GOTO:menuLoop

:menu_C   git clone Arduino 
cd %arduinoroot%
git clone https://github.com/Paulware/Arduino
GOTO:menuLoop

:menu_D   git clone BlocklyScriptcraft
cd %blocklyroot%
git clone https://github.com/Paulware/BlocklyScriptcraft
GOTO:menuLoop

:menu_E   git clone MinecraftWorlds
cd %worldsroot%
git clone https://github.com/Paulware/MinecraftWorlds
GOTO:menuLoop

:menu_F   git pull --all 
cd C:\SpigotMC\MinecraftWorlds
git pull --all 

cd C:\BlocklyScriptcraft\BlocklyScriptcraft
git pull --all

cd C:\Arduino
git pull --all 

cd c:\
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
