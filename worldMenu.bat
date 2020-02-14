@ECHO OFF
REM.-- Prepare the Command Processor
SETLOCAL ENABLEEXTENSIONS
SETLOCAL ENABLEDELAYEDEXPANSION
set destination=C:\SpigotMC\world\
set blocklyroot=C:\
set worldsroot=C:\SpigotMC
set arduinoroot=C:\
set plugin=C:\SpigotMC\scriptcraft\plugins\
set project=

:menuLOOP
echo.
echo.= Menu =================================================
echo.
for /f "tokens=1,2,* delims=_ " %%A in ('"findstr /b /c:":menu_" "%~f0""') do echo.  %%B  %%C
set choice=
echo.&set /p choice=Make a choice or hit ENTER to quit: ||GOTO:EOF
echo.&call:menu_%choice%
GOTO:menuLOOP

::-----------------------------------------------------------
:: menu functions follow below here
::-----------------------------------------------------------

:menu_1   Copy Hunger Games World 
set source=C:\SpigotMC\MinecraftWorlds\hungerGames\*.*
GOTO:copyFiles

:menu_2   Copy TNT Cannon
set source=C:\SpigotMC\MinecraftWorlds\tntCannon\*.*
copy C:\SpigotMC\MinecraftWorlds\tntCannon\startGame.js C:\SpigotMC\scriptcraft\plugins\startGame.js
GOTO:copyFiles

:menu_3   Copy Air Wars World
set project=airWars
set source=C:\SpigotMC\MinecraftWorlds\%project%\*.*
copy C:\SpigotMC\MinecraftWorlds\airWars\airWars.js C:\SpigotMC\scriptcraft\plugins\airWars.js
copy C:\SpigotMC\MinecraftWorlds\airWars\bukkit.yml C:\SpigotMC\bukkit.yml
copy C:\SpigotMC\MinecraftWorlds\airWars\spigot.yml C:\SpigotMC\spigot.yml
copy C:\SpigotMC\MinecraftWorlds\airWars\server.properties C:\SpigotMC\server.properties
GOTO:copyFiles

:menu_4   Control Mobs
set project=controlMob
set source=C:\SpigotMC\MinecraftWorlds\%project%\*.*
copy C:\SpigotMC\MinecraftWorlds\%project%\%project%.js C:\SpigotMC\scriptcraft\plugins\%project%.js
copy C:\SpigotMC\MinecraftWorlds\%project%\bukkit.yml C:\SpigotMC\bukkit.yml
copy C:\SpigotMC\MinecraftWorlds\%project%\spigot.yml C:\SpigotMC\spigot.yml
copy C:\SpigotMC\MinecraftWorlds\%project%\server.properties C:\SpigotMC\server.properties
GOTO:copyFiles

:menu_5   Copy Omaha Beach 
set project=omahaBeach
copy C:\SpigotMC\MinecraftWorlds\%project%\server.properties C:\SpigotMC\server.properties
del C:\SpigotMC\scriptcraft\plugins\omahaRules.js
copy C:\SpigotMC\MinecraftWorlds\%project%\%project%.js C:\SpigotMC\scriptcraft\plugins\%project%.js
copy C:\SpigotMC\MinecraftWorlds\%project%\spigot.yml C:\SpigotMC\spigot.yml
copy C:\SpigotMC\MinecraftWorlds\%project%\bukkit.yml C:\SpigotMC\bukkit.yml
set source=C:\SpigotMC\MinecraftWorlds\%project%
GOTO:copyFiles

:menu_6   Prison
set source=C:\SpigotMC\MinecraftWorlds\prison\*.*
copy C:\SpigotMC\MinecraftWorlds\prison\prisonRules.js C:\SpigotMC\scriptcraft\plugins\prisonRules.js
GOTO:copyFiles

:menu_7   Star Wars
set source=C:\SpigotMC\MinecraftWorlds\starWars\*.*
copy C:\SpigotMC\MinecraftWorlds\starWars\starWarsRules.js C:\SpigotMC\scriptcraft\plugins\starWarsRules.js
GOTO:copyFiles

:menu_8   bed wars
set project=bedWars
set source=C:\SpigotMC\MinecraftWorlds\%project%\*.*
copy C:\SpigotMC\MinecraftWorlds\%project%\%project%.js C:\SpigotMC\scriptcraft\plugins\%project%.js
copy C:\SpigotMC\MinecraftWorlds\%project%\autoMinecartGame.js C:\SpigotMC\scriptcraft\plugins\autoMinecartGame.js
copy C:\SpigotMC\MinecraftWorlds\%project%\bukkit.yml C:\SpigotMC\bukkit.yml
copy C:\SpigotMC\MinecraftWorlds\%project%\spigot.yml C:\SpigotMC\spigot.yml
copy C:\SpigotMC\MinecraftWorlds\%project%\server.properties C:\SpigotMC\server.properties
GOTO:copyFiles

:menu_9   Run the server
cd C:\SpigotMC
call runServer.bat
GOTO:menuLOOP

:menu_A   Spleef
set project=spleef
set source=C:\SpigotMC\MinecraftWorlds\%project%\*.*
copy C:\SpigotMC\MinecraftWorlds\%project%\%project%.js C:\SpigotMC\scriptcraft\plugins\%project%.js

GOTO:copyFiles

:menu_B   Set Backups as destination
set blocklyroot=C:\backups
set worldsroot=C:\backups
set arduinoroot=C:\backups
GOTO:menuLoop

:menu_C   git clone Arduino 
cd %arduinoroot%
git clone https://github.com/Paulware/Arduino

cd %blocklyroot%
git clone https://github.com/Paulware/BlocklyScriptcraft

cd %worldsroot%
mkdir c:\SpigotMC
git clone https://github.com/Paulware/MinecraftWorlds
GOTO:menuLoop

:menu_D   tower defense
set project=towerDefense
set source=C:\SpigotMC\MinecraftWorlds\%project%\*.*
copy C:\SpigotMC\MinecraftWorlds\%project%\%project%.js C:\SpigotMC\scriptcraft\plugins\
copy C:\SpigotMC\MinecraftWorlds\%project%\*.yml C:\SpigotMC\
GOTO:copyFiles

:menu_F   git pull --all 
cd C:\SpigotMC\MinecraftWorlds
git pull --all 

cd C:\BlocklyScriptcraft\BlocklyScriptcraft
git pull --all

cd C:\Arduino
git pull --all 

cd c:\

:menu_G   challenge
set project=starPusher
set source=C:\SpigotMC\MinecraftWorlds\%project%\*.*
copy C:\SpigotMC\MinecraftWorlds\%project%\*.js C:\SpigotMC\scriptcraft\plugins\
copy C:\SpigotMC\MinecraftWorlds\%project%\*.yml C:\SpigotMC\
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
xcopy %source% %destination% /E
copy startGame.js C:\SpigotMC\scriptcraft\plugins\
GOTO:makeJoin

:makeJoin
@echo events.playerJoin ( function (event) { > C:\SpigotMC\scriptcraft\plugins\join.js 
@echo   player = (event.player==null) ? null : event.getPlayer(); >> C:\SpigotMC\scriptcraft\plugins\join.js 
@echo   %project%Join(player); >> C:\SpigotMC\scriptcraft\plugins\join.js 
@echo  }); >> C:\SpigotMC\scriptcraft\plugins\join.js 

GOTO:EOF