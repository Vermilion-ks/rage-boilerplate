
import { NotificationType } from "@rage/shared";
import rpc from "rage-rpc";
const notificationState: { [playerId: string]: boolean } = {};

export async function executeNotification(
	player: Player,
	i18nMessage: string,
	type: NotificationType,
) {
	// Проверка, отправлялось ли уже уведомление игроку
	if (notificationState[player.uuid]) {
		return; // Если уведомление уже отправлено, выходим из функции
	}

	// Устанавливаем флаг, что уведомление отправлено
	notificationState[player.uuid] = true;

	rpc.callClient(
			player.mp,
			"Browser-Notification",
			{
				type: type,
				message:i18nMessage,
			}
		);

	setTimeout(() => {
		notificationState[player.uuid] = false;
	}, 1000);
}


