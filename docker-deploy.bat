@echo off
setlocal enabledelayedexpansion

set DOCKER_USERNAME=%1

docker swarm leave --force & docker build -t serviciu_clienti:latest serviciu_clienti && docker build -t serviciu_daune:latest serviciu_daune && docker build -t serviciu_plati:latest serviciu_plati && docker build -t serviciu_polite:latest serviciu_polite && docker tag serviciu_clienti:latest %DOCKER_USERNAME%/serviciu_clienti:latest && docker push %DOCKER_USERNAME%/serviciu_clienti:latest && docker tag serviciu_daune:latest %DOCKER_USERNAME%/serviciu_daune:latest && docker push %DOCKER_USERNAME%/serviciu_daune:latest && docker tag serviciu_plati:latest %DOCKER_USERNAME%/serviciu_plati:latest && docker push %DOCKER_USERNAME%/serviciu_plati:latest  && docker tag serviciu_polite:latest %DOCKER_USERNAME%/serviciu_polite:latest && docker push %DOCKER_USERNAME%/serviciu_polite:latest