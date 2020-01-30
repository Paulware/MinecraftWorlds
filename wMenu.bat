@ECHO OFF
REM.-- Prepare the Command Processor
SETLOCAL ENABLEEXTENSIONS
SETLOCAL ENABLEDELAYEDEXPANSION
set destination=C:\SpigotMC\world\
set blocklyroot=C:\
set worldsroot=C:\SpigotMC
set arduinoroot=C:\
set plugin=C:\SpigotMC\scriptcraft\plugins\

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

:menu_9   Run the server
c:
cd C:\SpigotMC
call runServer.bat
GOTO:menuLOOP


:menu_D   tower defense
set source=D:\world\*.*
copy D:\world\towerDefense\*.js C:\SpigotMC\scriptcraft\plugins\
copy D:\world\towerDefense\*.yml C:\SpigotMC\
GOTO:copyFiles


:copyFiles
echo remove %destination%
rmdir %destination% /q /s
mkdir %destination%
echo xcopy %source% %destination% /E 
xcopy %source% %destination% /E
GOTO:EOF