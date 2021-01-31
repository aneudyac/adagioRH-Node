
--select *
--Into bk.[tblEnviarNotificacionANoEnvias20213001]
--from [App].[tblEnviarNotificacionA]
--where isnull(Enviado,0) = 0


--alter table bk.[tblEnviarNotificacionANoEnvias20213001] add NuevoAdjuntos varchar(max)

create proc BK.spUpdateAdjuntosEnviarNotificacionA(
	@IDEnviarNotificacionA int,
	@Adjuntos varchar(max)
) as

update App.tblEnviarNotificacionA
--update bk.[tblEnviarNotificacionANoEnvias20213001]
	set Adjuntos = @Adjuntos
where IDEnviarNotificacionA = @IDEnviarNotificacionA


GO