package expo.modules.kesinalarm

import android.app.AlarmManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

// Android 12+ kesin alarm izni. expo-notifications bu izin yoksa bildirimleri kesin olmayan
// alarmla planlar; telefon uykudayken dakikalarca gecikebilir.
class KesinAlarmModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() = ModuleDefinition {
    Name("KesinAlarm")

    Function("izinVar") {
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return@Function true
      val alarm = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
      alarm.canScheduleExactAlarms()
    }

    // Uygulamanın "Alarmlar ve hatırlatıcılar" anahtarını doğrudan açar.
    Function("ayariAc") {
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return@Function false
      val intent = Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM)
        .setData(Uri.parse("package:" + context.packageName))
        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      context.startActivity(intent)
      true
    }
  }
}
